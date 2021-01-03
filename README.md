# sound-play

_Dead simple sound player for Node -- because it should be simple._

```javascript
const sound = require("sound-play");
sound.play("file.mp3");
```

- Support `.wav`, `.mp3` and other extensions.

- Work on `Windows` and `MacOS`

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
sound.play("file.mp3");
```

or

```javascript
const path = require("path");
const filePath = path.join(__dirname, "file.mp3");
sound.play(filePath);
```

### Adjusting Volume

```javascript
/**
 * 0   = silent
 * 0.5 = default
 * 1   = max volume
 */
volume = 0.1;
sound.play("file.mp3", volume);
```

### Absolute path

```javascript
sound.play("C:\\file.mp3");
```

### Promise

```javascript
sound.play("file.mp3").then((response) => console.log("done"));
```

### Async/await

```javascript
try {
  await sound.play("file.mp3");
  console.log("done");
} catch (error) {
  console.error(error);
}
```

# License

MIT
