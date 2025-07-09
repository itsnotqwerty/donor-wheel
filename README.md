# Spinning Wheel Multiplier App

A simple, modern web app for spinning a wheel to select a multiplier (0x, 1x, or 5x). Built with HTML, CSS, and JavaScript, and served using a minimal Deno + Oak static web server.

## Features
- Animated spinning wheel with 10 segments
- 7 white 0x, 2 gray 1x, and 1 orange 5x segment
- Responsive, mobile-friendly design
- Keyboard and button controls
- Clean, modern UI

## How to Run

1. **Install [Deno](https://deno.com/manual/getting_started/installation)** if you haven't already.
2. Start the server:

```sh
deno task start
```

3. Open your browser and go to [http://localhost:8000](http://localhost:8000)

## Project Structure

```
static/
  index.html      # Main app UI
  styles.css      # App styles
  index.js        # App logic
main.ts           # Deno Oak static server
```

## Usage
- Click the **SPIN** button or press **Space** to spin the wheel.
- The pointer will land on a random segment and display your multiplier.

---

Built for demonstration and fun. No dependencies except Deno and Oak.