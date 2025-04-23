import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import { LocalStorage } from 'node-localstorage';

const localStorage = new LocalStorage('./favorites');

// ApiKey and URL for The Movie Database API
const apiKey = process.env.movieDB_APIKey;
const apiUrl = 'https://api.themoviedb.org/3/discover/movie';
const genreListUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

const engine = new Liquid({ extname: '.liquid' });
const app = new App();
app.use(logger()).use('/', sirv('dist'));

// Genre map to store genre names
let genreMap = {};

// Get the genre list from the API and store it in genreMap
async function fetchGenres() {
  try {
    const response = await fetch(genreListUrl);
    const genreData = await response.json();
    genreMap = genreData.genres; // Store the list of genres
    return genreMap;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
}

async function fetchMovieData(page = 1, sort = 'popularity.desc', selected_genre = '') {
  try {
    // Use the genre and sort parameters to dynamically build the API URL
    const genreQuery = selected_genre ? `&with_genres=${selected_genre}` : '';
    const sortQuery = sort ? `&sort_by=${sort}` : '';
    const url = `${apiUrl}?api_key=${apiKey}&language=en-US&page=${page}${genreQuery}${sortQuery}`;
    
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
}

// Route for the home page
app.get('/', async (req, res) => {
  const selectedGenre = req.query.genre ? parseInt(req.query.genre, 10) : "";
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const sort = req.query.sort || 'popularity.desc';
  const searchQuery = req.query.search;

  let apiUrl;

  // Als search in de URL zit
  if (searchQuery) {
    // Gebruik de zoekendpoint van de API
    apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${page}&query=${encodeURIComponent(searchQuery)}`;
  } else {
    // Standaard ontdekking API
    const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
    apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${page}&sort_by=${sort}${genreQuery}`;
  }

  try {
    const response = await fetch(apiUrl);
    const movieData = await response.json();

    const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
    const genreData = await genreResponse.json();

    return res.send(renderTemplate('server/views/index.liquid', {
      title: 'Home',
      items: movieData.results,
      genre_names: genreData.genres,
      selected_genre: selectedGenre,
      sort: sort,
      page: page,
      total_pages: movieData.total_pages,
      search: searchQuery || ''
    }));
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
});


// Route for handling movie details page
app.get('/movie/:id/', async (req, res) => {
  const id = req.params.id;

  // Fetch detailed movie data by ID
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
  const response = await fetch(movieDetailsUrl);
  const item = await response.json();

  console.log(item);

  if (!item) {
    return res.status(404).send('Movie not found');
  }
  return res.send(renderTemplate('server/views/detail.liquid', {
    title: `Detail page for ${id}`,
    item: item
  }));
});

// Favorieten pagina
app.get('/favorites', async (req, res) => {
  const ids = getFavorites();

  if (!ids.length) {
    return res.send(renderTemplate('server/views/favorites.liquid', {
      title: 'Favorites',
      items: []
    }));
  }

  const items = [];
  for (const id of ids) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
    const response = await fetch(url);
    const movie = await response.json();
    items.push(movie);
  }

  return res.send(renderTemplate('server/views/favorites.liquid', {
    title: 'Favorites',
    items
  }));
});

// Function om Liquid template te renderen 
const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };
  return engine.renderFileSync(template, templateData);
};

// Fetch genres before starting the server
fetchGenres().then(() => {
  app.listen(3000, () => console.log('Server available on http://localhost:3000'));
});


// Favorites API

// Helper
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Toggle favorite
app.post('/api/favorites/:id', async (req, res) => {
  const id = req.params.id;
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
    saveFavorites(favorites);
    return res.json({ status: 'removed' });
  } else {
    favorites.push(id);
    saveFavorites(favorites);
    return res.json({ status: 'added' });
  }
});

// Check if a movie is in favorites
app.get('/api/favorites/:id', (req, res) => {
  const id = req.params.id;
  const favorites = getFavorites();
  res.json({ isFavorite: favorites.includes(id) });
});