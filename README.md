# Sonnet — books by feeling

A polished song-to-book recommendation app. Type a song or artist and Sonnet uses a local, deterministic mood engine to suggest real books — no AI API key or account required.

## Run locally

From the repository root:

```bash
npm install
npm run dev
```

Open http://localhost:5173. The API runs at http://localhost:5000.

## How the “AI without an API key” works

The server contains a small local mood/ranking model. It extracts words from the song query, scores matching book moods, and returns the strongest three matches. This keeps the app free and private. For richer AI later, you can connect a locally hosted model such as Ollama without putting a key in the browser.

## Song playback

The play control is intentionally a safe link/search experience: browser apps cannot legally or reliably stream arbitrary commercial music without a music provider integration. “Listen while you read” opens a YouTube search for the song. You can later add Spotify/YouTube Music links or embeds with their official SDKs and permissions.
