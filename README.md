# Movie Watchlist React

This application allows users to search for movies and maintain a personal watchlist. It uses the OMDb API to fetch movie details and stores watchlist data in the browser’s localStorage so it persists across sessions.

---

## Features

- **Movie Search**  
  Search for movies by title using the OMDb API. Display movie title, poster, and release year.

- **Add to Watchlist**  
  Each search result has an "Add to Watchlist" button. Prevents adding duplicates.

- **Watchlist Management**  
  Separate watchlist section where you can view all saved movies.  
  Remove movies from the list or move them between "Watched" and "Watchlist".

- **Persistent Storage**  
  Watchlist data is stored in localStorage to keep it even after reloading the page.

- **Responsive UI**  
  Clean and user-friendly interface designed with React and CSS.

---

## Technologies Used

- React
- React Router
- CSS
- OMDb API
- Context API
- localStorage

---

## Folder Structure

```
movie-watchlist/
├── src/
│   ├── api/
│   │   └── omdb.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   ├── MovieDetailModal.jsx
│   │   ├── Navbar.jsx
│   │   ├── SearchBar.jsx
│   │
│   ├── context/
│   │   └── WatchlistContext.jsx
│   │
│   ├── pages/
│   │   ├── SearchPage.jsx
│   │   └── WatchlistPage.jsx
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── README.md
├── tailwind.config.cjs
└── vite.config.js
```

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Rashijain2709/movie-watchlist.git

cd movie-watchlist
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Add your OMDb API key

```bash
VITE_OMDB_API_KEY=your_api_key_here
```

---

### 4. Start the development server

```bash
npm run dev
```

---

## Deployment to Vercel
- Push your code to GitHub (or any Git repository).

- Go to Vercel and log in.

- Click New Project → Import Git Repository.

- Select your repository and set the framework preset to Vite.

- Add your environment variable in Vercel:
  - Key: `VITE_OMDB_API_KEY`
  - Value: `your_api_key`

- Click Deploy.

---