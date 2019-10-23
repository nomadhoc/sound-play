const { exec } = require('child_process')
const execPromise = require('util').promisify(exec)

/* MAC PLAY COMMAND */
const macPlayCommand = path => `afplay ${path}`

/* WINDOW PLAY COMMANDS */
const addPresentationCore = `Add-Type -AssemblyName presentationCore;`
const createMediaPlayer = `$player = New-Object system.windows.media.mediaplayer;`
const loadAudioFile = path => `$player.open('${path}');`
const playAudio = `$player.Play();`
const stopAudio = `Start-Sleep 1; Start-Sleep -s $player.NaturalDuration.TimeSpan.TotalSeconds;Exit;`

const windowPlayCommand = path =>
  `powershell -c ${addPresentationCore} ${createMediaPlayer} ${loadAudioFile(
    path,
  )} ${playAudio} ${stopAudio}`

module.exports = {
  play: async path => {
    const playCommand =
      process.platform == 'darwin' ? macPlayCommand(path) : windowPlayCommand(path)
    try {
      await execPromise(playCommand)
    } catch (err) {
      throw err
    }
  },
}
