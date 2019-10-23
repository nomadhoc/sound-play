# sound-play

🎵
_Dead simple sound player for Node -- because it should be simple._
🤘

```javascript
const sound = require('sound-play')

sound.play('C:\\music.mp3')
```

- Support `.wav`, `.mp3` and other extensions.

- Work on `Window` and `MacOS`

# Install

```
npm install sound-play
```

```
yarn add sound-play
```

# Examples

### Absolute path

```javascript
sound.play('C:\\music.mp3')
```

### Relative path

```javascript
const path = require('path')
const musicPath = path.join(__dirname, 'music.mp3')
sound.play(musicPath)
```

### Promise

```javascript
sound.play('C:\\music.mp3').then(response => console.log('done'))
```

### Async/await

```javascript
try {
  await sound.play('C:\\music.mp3')
  console.log('done')
} catch (error) {
  console.error(error)
}
```

# License

MIT
