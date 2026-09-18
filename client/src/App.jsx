import { useMemo, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const starterBooks = [
  { title: 'The Night Circus', author: 'Erin Morgenstern', mood: 'dreamy, cinematic, mysterious', reason: 'A lush, nocturnal world for songs that feel like a secret portal.', color: 'rose' },
  { title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', mood: 'nostalgic, tender, electric', reason: 'For melodies that carry friendship, memory, and a little beautiful ache.', color: 'lilac' },
  { title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', mood: 'glamorous, bittersweet, dramatic', reason: 'A sweeping story with the same glitter-and-heart energy as a perfect chorus.', color: 'sun' },
];

function songLink(song) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`;
}

export default function App() {
  const [song, setSong] = useState('');
  const [books, setBooks] = useState(starterBooks);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [playing, setPlaying] = useState(false);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('book-favorites') || '[]'));

  const savedCount = useMemo(() => favorites.length, [favorites]);

  async function getRecommendations(event) {
    event?.preventDefault();
    const cleanSong = song.trim();
    if (!cleanSong) return setMessage('Type a song first — we need a little music magic.');
    setLoading(true); setMessage('Listening for the feeling in that song…');
    try {
      const response = await fetch(`${API}/api/book-recommendations?song=${encodeURIComponent(cleanSong)}`);
      if (!response.ok) throw new Error('API unavailable');
      const data = await response.json();
      setBooks(data.books); setMessage(data.note);
    } catch {
      setBooks(starterBooks); setMessage('Local mood engine is ready — try the song again after starting the API for custom results.');
    } finally { setLoading(false); }
  }

  function toggleFavorite(book) {
    const next = favorites.some((item) => item.title === book.title) ? favorites.filter((item) => item.title !== book.title) : [...favorites, book];
    setFavorites(next); localStorage.setItem('book-favorites', JSON.stringify(next));
  }

  return <main className="app-shell">
    <nav className="topbar"><div className="brand"><span className="brand-mark">✦</span><span>sonnet</span></div><div className="saved-pill">♡ {savedCount} saved</div></nav>
    <section className="hero">
      <div className="eyebrow">A tiny recommendation studio <span>✺</span></div>
      <h1>Find your next<br /><em>favorite chapter.</em></h1>
      <p className="hero-copy">Give us a song. We’ll turn its mood into a little stack of books you’ll want to get lost in.</p>
      <form className="song-form" onSubmit={getRecommendations}><span className="search-icon">⌕</span><input value={song} onChange={(event) => setSong(event.target.value)} placeholder="Try “Dreams” by Fleetwood Mac…" aria-label="Song title and artist" /><button type="submit" disabled={loading}>{loading ? 'Listening…' : 'Find my books  →'}</button></form>
      {message && <p className="status" role="status">{message}</p>}
      <div className="quick-row"><span>or start with a feeling</span>{['dreamy', 'heartbreak', 'main character energy', 'cozy'].map((feeling) => <button type="button" key={feeling} onClick={() => setSong(feeling)}>{feeling}</button>)}</div>
    </section>
    <section className="results-heading"><div><p className="eyebrow">Your mixtape, in books</p><h2>Three places to go next</h2></div><div className="now-playing">{playing ? '● now playing' : '◌ ready to play'}<span>{song || 'your song'}</span><button type="button" onClick={() => setPlaying(!playing)}>{playing ? 'Ⅱ' : '▶'}</button></div></section>
    <section className="book-grid">{books.map((book, index) => <article className={`book-card ${book.color || ['rose', 'lilac', 'sun'][index % 3]}`} key={`${book.title}-${index}`}><div className="card-top"><span className="number">0{index + 1}</span><button className="heart" type="button" onClick={() => toggleFavorite(book)} aria-label={`Save ${book.title}`}>{favorites.some((item) => item.title === book.title) ? '♥' : '♡'}</button></div><div className="book-cover"><span>✦</span><strong>{book.title}</strong><small>{book.author}</small></div><p className="mood">{book.mood}</p><h3>{book.title}</h3><p>{book.reason}</p><a href={songLink(song || 'dreamy indie songs')} target="_blank" rel="noreferrer">Listen while you read ↗</a></article>)}</section>
    <footer><span>Made for curious readers ✦</span><span>Private by default · no API key needed</span></footer>
  </main>;
}
