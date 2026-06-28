# Happy 20th Birthday Divya

A premium, interactive birthday website celebrating Divya's 20th birthday (29 June 2006).

## Quick Start

```bash
cd divya-birthday
python -m http.server 8080
```

Open **http://localhost:8080**

## Add Your Photos

Copy photos into `assets/photos/`:

| File | What to put here |
|------|------------------|
| `hero.jpg` | Your **favourite** photo — shown big at the top |
| `childhood-1.jpg` … `age-19.jpg` | Your first 6 memory photos (already set up) |
| `memory-7.jpg` … `memory-12.jpg` | Up to 6 more photos for gallery & timeline |

You can use **10–12 memory photos** total. Edit `scripts/data.js` to match your filenames, captions, and how many you use — remove any extra `memories` entries you don't need.

JPG or PNG both work — update the path in `data.js` if you use a different extension.

## How photos are used

- **Hero** → `hero.jpg`
- **Gallery** → all entries in `memories` (10–12 photos)
- **Timeline** → uses `memoryId` so each timeline photo matches the gallery
- **Carousel** → hero + all memories

## Music

| File | Purpose |
|------|---------|
| `assets/music/piano-soft.mp3` | Background music (starts automatically after the intro) |
| `assets/music/birthday-celebration.mp3` | Plays when candles are blown |

Use the 🎵 button to pause or resume background music.

## Customize text

Edit `scripts/data.js`:

- `hero` — main photo path
- `memories` — gallery/carousel photos + captions (each needs a unique `id`)
- `timeline` — use `memoryId: 'm1'` to link a milestone to a memory photo
- `reasons`, `wishes`, `quotes`

Letter text is in `index.html` inside `#envelope-letter`.

## Folder structure

```
divya-birthday/
├── index.html
├── assets/
│   ├── photos/          ← hero + up to 12 memory photos
│   └── music/
├── styles/main.css
└── scripts/
    ├── data.js          ← edit content here
    └── main.js
```

Made with love for Divya.
