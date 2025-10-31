# sound-play

_Dead simple sound player for Node -- because it should be simple._

```javascript
const sound = require("sound-play");
const player = sound.player("file.mp3");
player.play();

// Optional way to stop playing
player.stop();
```

- Native solution. Does not require third-party application to work on `Windows` and `MacOS`.

- Support `.wav`, `.mp3` and other extensions.

# Install

```
npm install sound-play
```

```
yarn add sound-play
```

# Examples

### Relative path

```javascript
sound.player("file.mp3").play();
```

or

```javascript
const path = require("path");
const filePath = path.join(__dirname, "file.mp3");
sound.player(filePath).play();
```

### Adjusting Volume

```javascript
/**
 * 0   = silent
 * 0.5 = default
 * 1   = max volume
 */
volume = 0.1;
sound.player("file.mp3", volume).play();
```

### Adjusting Speed Rate (Mac only)

```javascript
/**
 * 1 = normal | > 1 faster
 */
rate = 1.5;
sound.player("file.mp3", 0.5, rate).play();
```

### Absolute path

```javascript
sound.player("C:\\file.mp3").play();
```

### Promise

```javascript
sound
  .player("file.mp3")
  .play()
  .then((response) => console.log("done"));
```

### Async/await

```javascript
try {
  const player = sound.player("file.mp3");

  // Optional way to stop the sound playing before it was supposed to end
  setTimeout(() => {
    player.stop();
  }, 5000);

  await player.play();
  console.log("done");
} catch (error) {
  console.error(error);
}
```

# License

MIT
