const { execFile } = require('child_process')
const execFilePromise = require('util').promisify(execFile)

/* WINDOW PLAY COMMANDS */
const addPresentationCore = `Add-Type -AssemblyName presentationCore;`
const createMediaPlayer = `$player = New-Object system.windows.media.mediaplayer;`
// The path is read from an environment variable instead of being interpolated
// into the script text, so a path containing quotes cannot break out.
const loadAudioFile = `$player.open($env:SOUND_PLAY_PATH);`
const playAudio = `$player.Play();`
const stopAudio = `Start-Sleep 1; Start-Sleep -s $player.NaturalDuration.TimeSpan.TotalSeconds;Exit;`

const windowPlayScript = volume =>
  `${addPresentationCore} ${createMediaPlayer} ${loadAudioFile} $player.Volume = ${volume}; ${playAudio} ${stopAudio}`

/**
 * Plays an audio file on Mac or Windows
 *
 * @param {string} path - The file path to the audio file that will be played.
 * @param {number} [volume=0.5] - Playback volume as a decimal between 0 and 1.
 *  - Windows: Volume range is 0 to 1. Default is 0.5.
 *  - Mac: Volume range is scaled from 0 to 2 (where 2 is 100% volume). Values above 2 may cause distortion.
 * @param {number} [rate=1] - Playback rate multiplier (only used on Mac). 1 is normal speed.
 *
 * @throws Will throw an error if audio playback fails.
 */
module.exports = {
  play: async (path, volume=0.5, rate=1) => {
    const volumeAdjustedByOS = process.platform === 'darwin' ? Math.min(2, volume * 2) : volume

    // Arguments are passed as an argv array (no shell is involved), so
    // characters that are significant to a shell - $( ), backticks, quotes -
    // are treated as part of the file name rather than being executed.
    try {
      if (process.platform === 'darwin') {
        await execFilePromise('afplay', [
          path,
          '-v', String(volumeAdjustedByOS),
          '-r', String(rate),
        ])
      } else {
        await execFilePromise(
          'powershell',
          ['-NoProfile', '-Command', windowPlayScript(volumeAdjustedByOS)],
          { windowsHide: true, env: { ...process.env, SOUND_PLAY_PATH: path } },
        )
      }
    } catch (err) {
      throw err
    }
  },
}
