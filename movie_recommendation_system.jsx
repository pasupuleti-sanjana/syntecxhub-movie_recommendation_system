import { useState, useMemo } from "react";

// ── Dataset: 60 movies with genres, tags, director, cast ──────────────────────
const MOVIES = [
  { id: 1,  title: "The Dark Knight",         year: 2008, genres: ["Action","Crime","Drama"],         tags: ["superhero","batman","joker","dark","gritty"],       director: "Nolan",    rating: 9.0 },
  { id: 2,  title: "Inception",               year: 2010, genres: ["Action","Sci-Fi","Thriller"],     tags: ["dreams","heist","mindbending","scifi","layers"],    director: "Nolan",    rating: 8.8 },
  { id: 3,  title: "Interstellar",            year: 2014, genres: ["Sci-Fi","Drama","Adventure"],     tags: ["space","time","love","physics","epic"],             director: "Nolan",    rating: 8.6 },
  { id: 4,  title: "The Matrix",              year: 1999, genres: ["Action","Sci-Fi"],                tags: ["simulation","cyberpunk","bullet","philosophy"],     director: "Wachowski",rating: 8.7 },
  { id: 5,  title: "Parasite",                year: 2019, genres: ["Drama","Thriller","Comedy"],      tags: ["class","social","korean","dark","family"],          director: "Bong",     rating: 8.5 },
  { id: 6,  title: "Pulp Fiction",            year: 1994, genres: ["Crime","Drama"],                  tags: ["nonlinear","violence","cult","dialogue","noir"],    director: "Tarantino",rating: 8.9 },
  { id: 7,  title: "The Godfather",           year: 1972, genres: ["Crime","Drama"],                  tags: ["mafia","family","power","classic","italian"],       director: "Coppola",  rating: 9.2 },
  { id: 8,  title: "Goodfellas",              year: 1990, genres: ["Crime","Drama","Biography"],      tags: ["mafia","mob","true story","violence","classic"],    director: "Scorsese", rating: 8.7 },
  { id: 9,  title: "Avengers: Endgame",       year: 2019, genres: ["Action","Adventure","Sci-Fi"],   tags: ["superhero","marvel","epic","time travel","battle"], director: "Russo",    rating: 8.4 },
  { id: 10, title: "Spider-Man: No Way Home", year: 2021, genres: ["Action","Adventure","Sci-Fi"],   tags: ["superhero","spiderman","multiverse","marvel"],      director: "Watts",    rating: 8.3 },
  { id: 11, title: "Get Out",                 year: 2017, genres: ["Horror","Mystery","Thriller"],    tags: ["race","psychological","social","twist","fear"],     director: "Peele",    rating: 7.7 },
  { id: 12, title: "Us",                      year: 2019, genres: ["Horror","Mystery","Thriller"],    tags: ["doppelganger","social","fear","twist","symbolic"],  director: "Peele",    rating: 6.8 },
  { id: 13, title: "A Quiet Place",           year: 2018, genres: ["Horror","Drama","Sci-Fi"],        tags: ["silence","monster","survival","family","tension"],  director: "Krasinski",rating: 7.5 },
  { id: 14, title: "Hereditary",              year: 2018, genres: ["Horror","Drama","Mystery"],       tags: ["cult","grief","family","occult","disturbing"],      director: "Aster",    rating: 7.3 },
  { id: 15, title: "Midsommar",               year: 2019, genres: ["Horror","Drama","Mystery"],       tags: ["cult","pagan","folk horror","grief","disturbing"],  director: "Aster",    rating: 7.1 },
  { id: 16, title: "Whiplash",               year: 2014, genres: ["Drama","Music"],                  tags: ["music","ambition","drums","obsession","intense"],   director: "Chazelle", rating: 8.5 },
  { id: 17, title: "La La Land",              year: 2016, genres: ["Drama","Music","Romance"],        tags: ["jazz","dreams","romance","musical","LA"],           director: "Chazelle", rating: 8.0 },
  { id: 18, title: "Black Swan",              year: 2010, genres: ["Drama","Thriller","Horror"],      tags: ["ballet","obsession","dual","psychological","art"],  director: "Aronofsky",rating: 8.0 },
  { id: 19, title: "Requiem for a Dream",     year: 2000, genres: ["Drama"],                          tags: ["addiction","dark","intense","disturbing","tragic"], director: "Aronofsky",rating: 8.3 },
  { id: 20, title: "Fight Club",              year: 1999, genres: ["Drama","Thriller"],               tags: ["identity","anarchy","cult","twist","psychology"],   director: "Fincher",  rating: 8.8 },
  { id: 21, title: "Se7en",                   year: 1995, genres: ["Crime","Drama","Mystery"],        tags: ["serial killer","detective","dark","sins","twist"],  director: "Fincher",  rating: 8.6 },
  { id: 22, title: "Gone Girl",               year: 2014, genres: ["Drama","Mystery","Thriller"],     tags: ["marriage","mystery","media","twist","dark"],        director: "Fincher",  rating: 8.1 },
  { id: 23, title: "Joker",                   year: 2019, genres: ["Crime","Drama","Thriller"],       tags: ["batman","villain","mental","origin","dark"],        director: "Phillips", rating: 8.4 },
  { id: 24, title: "Forrest Gump",            year: 1994, genres: ["Drama","Romance"],                tags: ["life","history","running","heartwarming","classic"],director: "Zemeckis", rating: 8.8 },
  { id: 25, title: "The Shawshank Redemption",year: 1994, genres: ["Drama"],                          tags: ["prison","hope","friendship","freedom","classic"],   director: "Darabont", rating: 9.3 },
  { id: 26, title: "Schindler's List",        year: 1993, genres: ["Drama","Biography","History"],    tags: ["holocaust","war","jewish","heroism","powerful"],    director: "Spielberg",rating: 9.0 },
  { id: 27, title: "Saving Private Ryan",     year: 1998, genres: ["Drama","Action","History"],       tags: ["war","ww2","military","sacrifice","intense"],       director: "Spielberg",rating: 8.6 },
  { id: 28, title: "1917",                    year: 2019, genres: ["Action","Drama","War"],           tags: ["ww1","one shot","military","mission","intense"],    director: "Mendes",   rating: 8.3 },
  { id: 29, title: "Dunkirk",                 year: 2017, genres: ["Action","Drama","History"],       tags: ["ww2","war","survival","nonlinear","intense"],       director: "Nolan",    rating: 7.9 },
  { id: 30, title: "Mad Max: Fury Road",      year: 2015, genres: ["Action","Adventure","Sci-Fi"],   tags: ["apocalypse","desert","chase","feminist","wild"],    director: "Miller",   rating: 8.1 },
  { id: 31, title: "John Wick",               year: 2014, genres: ["Action","Crime","Thriller"],      tags: ["assassin","revenge","gun fu","intense","cool"],     director: "Stahelski",rating: 7.4 },
  { id: 32, title: "Baby Driver",             year: 2017, genres: ["Action","Crime","Drama"],         tags: ["heist","music","driving","stylish","fun"],          director: "Wright",   rating: 7.6 },
  { id: 33, title: "Knives Out",              year: 2019, genres: ["Comedy","Crime","Drama"],         tags: ["mystery","whodunit","family","fun","detective"],    director: "Johnson",  rating: 7.9 },
  { id: 34, title: "The Grand Budapest Hotel",year: 2014, genres: ["Adventure","Comedy","Drama"],     tags: ["quirky","visual","colorful","european","fun"],      director: "Anderson", rating: 8.1 },
  { id: 35, title: "Moonrise Kingdom",        year: 2012, genres: ["Adventure","Comedy","Drama"],     tags: ["quirky","love","childhood","visual","whimsical"],   director: "Anderson", rating: 7.8 },
  { id: 36, title: "Everything Everywhere",   year: 2022, genres: ["Action","Adventure","Sci-Fi"],   tags: ["multiverse","absurd","emotional","indie","wild"],   director: "Daniels",  rating: 7.8 },
  { id: 37, title: "Eternal Sunshine",        year: 2004, genres: ["Drama","Romance","Sci-Fi"],       tags: ["memory","love","loss","scifi","emotional"],         director: "Gondry",   rating: 8.3 },
  { id: 38, title: "Her",                     year: 2013, genres: ["Drama","Romance","Sci-Fi"],       tags: ["AI","loneliness","love","future","emotional"],      director: "Jonze",    rating: 8.0 },
  { id: 39, title: "Ex Machina",              year: 2014, genres: ["Drama","Sci-Fi","Thriller"],      tags: ["AI","robot","ethics","thriller","cerebral"],        director: "Garland",  rating: 7.7 },
  { id: 40, title: "Arrival",                 year: 2016, genres: ["Drama","Sci-Fi","Mystery"],       tags: ["alien","language","time","emotional","cerebral"],   director: "Villeneuve",rating:7.9 },
  { id: 41, title: "Blade Runner 2049",       year: 2017, genres: ["Drama","Sci-Fi","Thriller"],      tags: ["dystopia","replicant","neo-noir","future","slow"],  director: "Villeneuve",rating:8.0 },
  { id: 42, title: "Dune",                    year: 2021, genres: ["Action","Adventure","Drama"],     tags: ["space","epic","desert","scifi","political"],        director: "Villeneuve",rating:8.1 },
  { id: 43, title: "The Revenant",            year: 2015, genres: ["Action","Adventure","Drama"],     tags: ["survival","nature","bear","revenge","brutal"],      director: "Inarritu", rating: 8.0 },
  { id: 44, title: "No Country for Old Men",  year: 2007, genres: ["Crime","Drama","Thriller"],       tags: ["nihilism","texas","chase","evil","slow"],           director: "Coen",     rating: 8.1 },
  { id: 45, title: "Fargo",                   year: 1996, genres: ["Crime","Drama","Thriller"],       tags: ["midwest","dark comedy","snow","crime","quirky"],    director: "Coen",     rating: 8.1 },
  { id: 46, title: "The Social Network",      year: 2010, genres: ["Biography","Drama"],              tags: ["facebook","tech","betrayal","ambition","fast"],     director: "Fincher",  rating: 7.7 },
  { id: 47, title: "Moneyball",               year: 2011, genres: ["Biography","Drama","Sport"],      tags: ["baseball","statistics","underdog","true story"],    director: "Miller",   rating: 7.6 },
  { id: 48, title: "The Wolf of Wall Street", year: 2013, genres: ["Biography","Comedy","Crime"],     tags: ["excess","money","fraud","wild","true story"],       director: "Scorsese", rating: 8.2 },
  { id: 49, title: "Catch Me If You Can",     year: 2002, genres: ["Biography","Crime","Drama"],      tags: ["con artist","chase","true story","fun","fraud"],    director: "Spielberg",rating: 8.1 },
  { id: 50, title: "Shutter Island",          year: 2010, genres: ["Mystery","Thriller","Drama"],     tags: ["asylum","mind bending","detective","twist","dark"], director: "Scorsese", rating: 8.1 },
  { id: 51, title: "Memento",                 year: 2000, genres: ["Mystery","Thriller","Drama"],     tags: ["memory","nonlinear","mindbending","detective"],     director: "Nolan",    rating: 8.4 },
  { id: 52, title: "The Prestige",            year: 2006, genres: ["Drama","Mystery","Sci-Fi"],       tags: ["magic","obsession","rivalry","twist","Victorian"], director: "Nolan",    rating: 8.5 },
  { id: 53, title: "12 Angry Men",            year: 1957, genres: ["Crime","Drama"],                  tags: ["jury","debate","justice","classic","dialogue"],     director: "Lumet",    rating: 9.0 },
  { id: 54, title: "Rear Window",             year: 1954, genres: ["Mystery","Thriller"],             tags: ["voyeur","suspense","classic","hitchcock","mystery"],director: "Hitchcock",rating: 8.5 },
  { id: 55, title: "Psycho",                  year: 1960, genres: ["Horror","Mystery","Thriller"],    tags: ["slasher","classic","hitchcock","twist","iconic"],   director: "Hitchcock",rating: 8.5 },
  { id: 56, title: "The Silence of the Lambs",year:1991, genres: ["Crime","Drama","Thriller"],       tags: ["serial killer","detective","cannibalism","thriller"],director: "Demme",    rating: 8.6 },
  { id: 57, title: "Prisoners",               year: 2013, genres: ["Crime","Drama","Mystery"],        tags: ["kidnap","detective","dark","moral","intense"],      director: "Villeneuve",rating:8.1 },
  { id: 58, title: "Zodiac",                  year: 2007, genres: ["Crime","Drama","Mystery"],        tags: ["serial killer","true crime","detective","long"],    director: "Fincher",  rating: 7.7 },
  { id: 59, title: "Oldboy",                  year: 2003, genres: ["Action","Drama","Mystery"],       tags: ["korean","revenge","twist","disturbing","dark"],     director: "Park",     rating: 8.4 },
  { id: 60, title: "Train to Busan",          year: 2016, genres: ["Action","Horror","Drama"],        tags: ["zombie","korean","survival","emotional","fast"],    director: "Yeon",     rating: 7.6 },
];

// ── TF-IDF style feature vector ──────────────────────────────────────────────
const buildVocab = () => {
  const vocab = new Set();
  MOVIES.forEach(m => {
    m.genres.forEach(g => vocab.add("genre_" + g.toLowerCase().replace(/ /g,"_")));
    m.tags.forEach(t => vocab.add("tag_" + t.toLowerCase().replace(/ /g,"_")));
    vocab.add("dir_" + m.director.toLowerCase());
  });
  return Array.from(vocab);
};

const VOCAB = buildVocab();

const toVector = (movie) => {
  const vec = new Array(VOCAB.length).fill(0);
  movie.genres.forEach(g => {
    const idx = VOCAB.indexOf("genre_" + g.toLowerCase().replace(/ /g,"_"));
    if (idx >= 0) vec[idx] = 1.5; // genres weighted higher
  });
  movie.tags.forEach(t => {
    const idx = VOCAB.indexOf("tag_" + t.toLowerCase().replace(/ /g,"_"));
    if (idx >= 0) vec[idx] = 1;
  });
  const dIdx = VOCAB.indexOf("dir_" + movie.director.toLowerCase());
  if (dIdx >= 0) vec[dIdx] = 1.2;
  return vec;
};

const VECTORS = MOVIES.map(toVector);

const cosineSim = (a, b) => {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i]*b[i]; magA += a[i]*a[i]; magB += b[i]*b[i]; }
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
};

const recommend = (movieId, n = 6) => {
  const idx = MOVIES.findIndex(m => m.id === movieId);
  const srcVec = VECTORS[idx];
  return MOVIES
    .map((m, i) => ({ movie: m, score: i === idx ? -1 : cosineSim(srcVec, VECTORS[i]) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
};

// ── Colour palette ────────────────────────────────────────────────────────────
const C = {
  bg: "#0d0d14",
  surface: "#13131f",
  card: "#1a1a2e",
  border: "#2a2a45",
  accent: "#7c3aed",
  accentSoft: "#9d63f5",
  gold: "#f59e0b",
  text: "#e8e8f0",
  muted: "#8888aa",
  pill: "#252545",
};

const genreColors = {
  Action:"#ef4444",Crime:"#f97316",Drama:"#6366f1",Sci-Fi:"#06b6d4",
  Thriller:"#8b5cf6",Horror:"#dc2626","Sci-Fi":"#06b6d4",Adventure:"#10b981",
  Comedy:"#f59e0b",Romance:"#ec4899",Mystery:"#a78bfa",Music:"#14b8a6",
  Biography:"#84cc16",History:"#d97706",War:"#78716c",Sport:"#22c55e",
};

const genreColor = (g) => genreColors[g] || "#6366f1";

// ── Star rating ───────────────────────────────────────────────────────────────
const Stars = ({ rating }) => {
  const full = Math.round(rating / 2);
  return (
    <span style={{ color: C.gold, fontSize: 12, letterSpacing: 1 }}>
      {"★".repeat(full)}{"☆".repeat(5 - full)}
      <span style={{ color: C.muted, marginLeft: 6, fontSize: 11 }}>{rating}</span>
    </span>
  );
};

// ── Movie Card ────────────────────────────────────────────────────────────────
const MovieCard = ({ movie, score, onClick, selected }) => {
  const [hovered, setHovered] = useState(false);
  const border = selected ? C.accentSoft : hovered ? C.border : "transparent";
  return (
    <div
      onClick={() => onClick(movie)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: selected ? "#1e1a35" : C.card,
        border: `1.5px solid ${border}`,
        borderRadius: 14,
        padding: "16px 18px",
        cursor: "pointer",
        transition: "all 0.18s ease",
        transform: hovered && !selected ? "translateY(-2px)" : "none",
        boxShadow: selected ? `0 0 0 2px ${C.accent}44` : hovered ? "0 6px 24px #00000055" : "none",
        position: "relative",
      }}
    >
      {score !== undefined && (
        <div style={{
          position: "absolute", top: 10, right: 12,
          background: C.accent, borderRadius: 20, padding: "2px 9px",
          fontSize: 11, fontWeight: 700, color: "#fff",
        }}>
          {Math.round(score * 100)}% match
        </div>
      )}
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 2 }}>{movie.year}</div>
      <div style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 8, lineHeight: 1.3 }}>
        {movie.title}
      </div>
      <Stars rating={movie.rating} />
      <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 5 }}>
        {movie.genres.map(g => (
          <span key={g} style={{
            background: genreColor(g) + "25", color: genreColor(g),
            border: `1px solid ${genreColor(g)}44`,
            borderRadius: 20, padding: "2px 9px", fontSize: 11, fontWeight: 600,
          }}>{g}</span>
        ))}
      </div>
      <div style={{ marginTop: 8, color: C.muted, fontSize: 11 }}>
        dir. {movie.director}
      </div>
    </div>
  );
};

// ── Search bar ────────────────────────────────────────────────────────────────
const SearchBar = ({ query, setQuery }) => (
  <div style={{ position: "relative", width: "100%", maxWidth: 480 }}>
    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.muted, fontSize: 16 }}>🔍</span>
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search movies…"
      style={{
        width: "100%", boxSizing: "border-box",
        background: C.card, border: `1.5px solid ${C.border}`,
        borderRadius: 12, padding: "10px 16px 10px 42px",
        color: C.text, fontSize: 14, outline: "none",
      }}
    />
  </div>
);

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");

  const allGenres = useMemo(() => {
    const s = new Set();
    MOVIES.forEach(m => m.genres.forEach(g => s.add(g)));
    return ["All", ...Array.from(s).sort()];
  }, []);

  const filtered = useMemo(() => {
    return MOVIES.filter(m => {
      const matchQ = m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.tags.some(t => t.includes(query.toLowerCase())) ||
        m.genres.some(g => g.toLowerCase().includes(query.toLowerCase()));
      const matchG = genreFilter === "All" || m.genres.includes(genreFilter);
      return matchQ && matchG;
    });
  }, [query, genreFilter]);

  const recommendations = useMemo(() =>
    selected ? recommend(selected.id, 6) : [], [selected]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, #1a0a35 0%, #0d0d14 60%)`,
        borderBottom: `1px solid ${C.border}`,
        padding: "28px 32px 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>🎬</span>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, background: `linear-gradient(90deg, ${C.accentSoft}, #c084fc)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              CineMatch
            </h1>
            <span style={{ marginLeft: 8, fontSize: 12, color: C.muted, border: `1px solid ${C.border}`, borderRadius: 20, padding: "2px 10px" }}>
              Content-Based ML
            </span>
          </div>
          <p style={{ margin: 0, color: C.muted, fontSize: 13 }}>
            Pick a movie — our cosine similarity engine finds what to watch next.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 32px" }}>
        {/* Controls */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 24 }}>
          <SearchBar query={query} setQuery={setQuery} />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {allGenres.slice(0, 9).map(g => (
              <button key={g} onClick={() => setGenreFilter(g)} style={{
                background: genreFilter === g ? C.accent : C.pill,
                color: genreFilter === g ? "#fff" : C.muted,
                border: "none", borderRadius: 20, padding: "6px 14px",
                fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
              }}>{g}</button>
            ))}
          </div>
        </div>

        {/* Recommendations panel */}
        {selected && (
          <div style={{
            background: `linear-gradient(135deg, #1e1028, #141430)`,
            border: `1.5px solid ${C.accent}55`,
            borderRadius: 18, padding: "22px 24px", marginBottom: 28,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 20 }}>✨</span>
              <span style={{ fontWeight: 700, fontSize: 16, color: C.accentSoft }}>
                Because you like <em style={{ color: C.text }}>"{selected.title}"</em>
              </span>
              <button onClick={() => setSelected(null)} style={{
                marginLeft: "auto", background: "none", border: `1px solid ${C.border}`,
                borderRadius: 8, color: C.muted, padding: "4px 12px", cursor: "pointer", fontSize: 12,
              }}>✕ Clear</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
              {recommendations.map(({ movie, score }) => (
                <MovieCard key={movie.id} movie={movie} score={score} onClick={setSelected} selected={selected?.id === movie.id} />
              ))}
            </div>

            {/* How it works */}
            <div style={{ marginTop: 18, padding: "12px 16px", background: "#ffffff08", borderRadius: 10, fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
              <strong style={{ color: C.accentSoft }}>How it works:</strong> Each movie is encoded as a TF-IDF-style vector over genres (×1.5), tags (×1.0), and director (×1.2).
              Cosine similarity ranks all other movies by the angle between their vectors.
              Match % = similarity × 100.
            </div>
          </div>
        )}

        {/* Movie grid */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: C.muted }}>
            {filtered.length} movie{filtered.length !== 1 ? "s" : ""} · click any to get recommendations
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎭</div>
            <div>No movies match your search.</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
            {filtered.map(m => (
              <MovieCard key={m.id} movie={m} onClick={setSelected} selected={selected?.id === m.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
