[README (3).md](https://github.com/user-attachments/files/28993924/README.3.md)
#  Movie Recommendation System

**Syntecxhub Internship Program | Machine Learning | Task 4 | Project 1**

---

## Project Overview

CineMatch is a content-based movie recommendation system built with React. It uses a TF-IDF-style feature encoding and cosine similarity to recommend movies based on a user's selected movie from a curated dataset of 60 films.

---

## Features

- Content-based filtering using cosine similarity
- 60 movies encoded with genre, tag, and director feature vectors
- Live search by title, genre, or keyword tags
- Genre filter pills for quick browsing
- Match percentage score displayed for each recommendation
- Fully interactive single-page React application

---

## How It Works

### 1. Feature Engineering

Each movie is encoded as a sparse vector over a shared vocabulary built from:

| Feature | Weight | Example token |
|---------|--------|---------------|
| Genre | 1.5x | `genre_action` |
| Tag | 1.0x | `tag_heist` |
| Director | 1.2x | `dir_nolan` |

### 2. Cosine Similarity

```
similarity(A, B) = (A · B) / (||A|| × ||B||)
```

Measures the angle between two feature vectors. Score of 1.0 = identical profiles; 0.0 = no overlap.

### 3. Recommendation Pipeline

1. User clicks a movie → its feature vector is retrieved
2. Cosine similarity is computed against all other 59 movies
3. Results sorted descending; top 6 are displayed
4. Match % = similarity score × 100

---

## Sample Results

| Input Movie | Top Recommendations |
|-------------|---------------------|
| The Dark Knight | Joker, Se7en, Inception, No Country for Old Men |
| Inception | Memento, The Prestige, Interstellar, Shutter Island |
| Parasite | Oldboy, Train to Busan, Get Out, Knives Out |
| Hereditary | Midsommar, Get Out, A Quiet Place, Black Swan |
| Whiplash | Black Swan, La La Land, Requiem for a Dream |
| The Godfather | Goodfellas, Pulp Fiction, 12 Angry Men, Fargo |

> Director-shared movies (e.g., Nolan films) cluster together. Tags like `psychological` and `cult` create strong thematic links.

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | React 18 (hooks + functional components) |
| Algorithm | Cosine similarity (custom JS) |
| Encoding | TF-IDF-style weighted sparse vectors |
| Dataset | 60-movie curated corpus |
| Styling | Inline CSS, dark-mode palette |
| State | useState, useMemo |

---

## Project Structure

```
movie_recommendation_system.jsx
├── MOVIES[]           — Dataset: 60 movies with metadata
├── buildVocab()       — Constructs shared feature vocabulary
├── toVector()         — Encodes a movie as a weighted feature vector
├── cosineSim()        — Computes cosine similarity between two vectors
├── recommend()        — Returns top-N similar movies for a given ID
├── MovieCard          — UI component for individual movie display
├── SearchBar          — Live search input
└── App                — Root component with state and layout
```

---

## How to Run

### Option A — Claude Artifact (Instant)
Open `movie_recommendation_system.jsx` in claude.ai as a React artifact. No setup needed.

### Option B — Local React App

```bash
npx create-react-app cinematch
cd cinematch
# Replace src/App.js with the contents of movie_recommendation_system.jsx
npm start
```

### Option C — Flask API (Optional Extension)

```bash
pip install flask scikit-learn pandas
# Encode movies as TF-IDF matrix using sklearn
# POST /recommend  { "movie_id": 1 }  →  returns top-6 similar movies
```

---

## Possible Extensions

- **Real Dataset** — Replace `MOVIES[]` with MovieLens 100K or TMDB API data
- **Collaborative Filtering** — Add user-rating matrix + SVD/ALS decomposition
- **Hybrid Model** — Combine content-based + collaborative scores
- **NLP Features** — TF-IDF on movie plot summaries for richer vectors
- **Evaluation** — Compute Precision@K and Recall@K on held-out ratings

---

