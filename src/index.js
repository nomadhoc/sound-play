const { spawn } = require('child_process')

/* MAC PLAY COMMAND */
const macPlayCommand = (path, volume, rate) => `afplay \"${path}\" -v ${volume} -r ${rate}`

/* WINDOW PLAY COMMANDS */
const addPresentationCore = `Add-Type -AssemblyName presentationCore;`
const createMediaPlayer = `$player = New-Object system.windows.media.mediaplayer;`
const loadAudioFile = path => `$player.open('${path}');`
const playAudio = `$player.Play();`
const stopAudio = `Start-Sleep 1; Start-Sleep -s $player.NaturalDuration.TimeSpan.TotalSeconds;Exit;`

const windowPlayCommand = (path, volume) =>
  `powershell -c ${addPresentationCore} ${createMediaPlayer} ${loadAudioFile(
    path,
  )} $player.Volume = ${volume}; ${playAudio} ${stopAudio}`

// Script-only (same as above but without the leading "powershell -c")
const windowPlayScript = (path, volume) =>
  `${addPresentationCore} ${createMediaPlayer} ${loadAudioFile(
    path,
  )} $player.Volume = ${volume}; ${playAudio} ${stopAudio}`

/**
 * Creates an audio player object on Mac or Windows.
 *
 * @param {string} path
 * @param {number} [volume=0.5]  // Win 0..1; Mac scaled to 0..2
 * @param {number} [rate=1]      // Mac only
 */
module.exports = {
  player: (path, volume = 0.5, rate = 1) => {
    const volumeAdjustedByOS =
      process.platform === 'darwin' ? Math.min(2, volume * 2) : volume

    let child = null
    let playing = false
    let playPromise = null

    const spawnProcess = () => {
      if (process.platform === 'darwin') {
        // Use afplay directly so signals stop playback
        return spawn(
          'afplay',
          [path, '-v', String(volumeAdjustedByOS), '-r', String(rate)],
          { stdio: 'ignore', windowsHide: true }
        )
      }
      // Windows: keep using System.Windows.Media.MediaPlayer via PowerShell
      const script = windowPlayScript(path, volumeAdjustedByOS)
      return spawn(
        'powershell',
        ['-NoProfile', '-NonInteractive', '-Command', script],
        { stdio: 'ignore', windowsHide: true }
      )
    }

    const play = () => {
      if (playing) return playPromise
      child = spawnProcess()
      playing = true

      playPromise = new Promise((resolve, reject) => {
        child.once('error', (err) => {
          playing = false
          child = null
          reject(err)
        })
        child.once('exit', (code, signal) => {
          playing = false
          const wasKilled = !!signal
          const okExit = code === 0 && !wasKilled
          child = null
          okExit ? resolve() : reject(new Error(wasKilled ? 'Playback stopped' : `Playback failed (code ${code})`))
        })
      })

      return playPromise
    }

    const stop = () => {
      if (!child) return false
      try {
        if (process.platform === 'win32') {
          // Kill PowerShell and its children to ensure MediaPlayer stops
          spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], {
            stdio: 'ignore',
            windowsHide: true,
          })
        } else {
          // macOS: send SIGTERM to afplay (direct child), fallback to SIGKILL
          if (!child.kill('SIGTERM')) child.kill('SIGKILL')
        }
        return true
      } catch {
        return false
      }
    }

    return { play, stop }
  },
}
