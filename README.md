# audio-node
🎵
_Dead simple audio player for Node -- because it should be simple._ 
🤘
```javascript
const audio = require('audio-node')

audio.play('C:\\music.mp3')
```

- Support `.wav`, `.mp3` and other extensions.

- Work on `Window` and `MacOS`

# Install
```
npm install audio-node
```
```
yarn add audio-node
```

# Examples
### Absolute path
```javascript
audio.play('C:\\music.mp3')
```

### Relative path
```javascript
const path = require('path')
const musicPath = path.join(__dirname, 'music.mp3')
audio.play(musicPath)
```

### Promise
```javascript
audio.play('C:\\music.mp3').then(response => console.log('done'))
```

### Async/await
```javascript
try {
  await audio.play ('C:\\music.mp3')
  console.log('done')
  
} catch (error) {
  console.error(error)
}
```

# License
MIT
