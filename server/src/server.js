import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const books = [
  { title: 'The Night Circus', author: 'Erin Morgenstern', moods: ['dreamy','mysterious','cinematic','magic'], mood: 'dreamy · cinematic · mysterious', reason: 'A lush, nocturnal world for songs that feel like a secret portal.', color: 'rose' },
  { title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', moods: ['nostalgic','tender','electric','friendship'], mood: 'nostalgic · tender · electric', reason: 'For melodies that carry friendship, memory, and a little beautiful ache.', color: 'lilac' },
  { title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', moods: ['glamorous','bittersweet','dramatic','main character'], mood: 'glamorous · bittersweet · dramatic', reason: 'A sweeping story with the same glitter-and-heart energy as a perfect chorus.', color: 'sun' },
  { title: 'A Psalm for the Wild-Built', author: 'Becky Chambers', moods: ['cozy','hopeful','soft','peaceful'], mood: 'cozy · hopeful · soft', reason: 'A warm, gentle reset for songs that feel like sunlight through a window.', color: 'rose' },
  { title: 'The Song of Achilles', author: 'Madeline Miller', moods: ['heartbreak','romantic','epic','sad'], mood: 'romantic · epic · aching', reason: 'For the kind of beautiful heartbreak that deserves a whole mythology.', color: 'lilac' },
  { title: 'Daisy Jones & The Six', author: 'Taylor Jenkins Reid', moods: ['rock','music','messy','electric'], mood: 'rock · messy · electric', reason: 'The obvious backstage pass for a song with guitars, secrets, and complicated people.', color: 'sun' },
];
const words = (value) => value.toLowerCase().split(/[^a-z]+/).filter(Boolean);
app.get('/api/health', (_, res) => res.json({ status: 'ok', ai: 'local-mood-engine' }));
app.get('/api/book-recommendations', (req, res) => {
  const song = String(req.query.song || '').trim();
  if (!song) return res.status(400).json({ message: 'Please provide a song.' });
  const tokens = words(song);
  const ranked = books.map((book) => ({ ...book, score: book.moods.reduce((score, mood) => score + (tokens.some((token) => mood.includes(token) || token.includes(mood)) ? 4 : 0), 0) + (tokens.length % 3) })).sort((a, b) => b.score - a.score);
  const selected = ranked.slice(0, 3).map(({ moods, score, ...book }) => book);
  res.json({ song, books: selected, note: `A local AI-style mood match for “${song}” — no API key, account, or song data sent anywhere.` });
});
app.listen(port, () => console.log(`Sonnet API running on http://localhost:${port}`));
