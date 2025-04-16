import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

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
  const page = req.query.page ? parseInt(req.query.page, 10) : 1; // Get current page, default to 1

  // Get the selected genre name from the genreMap
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${page}&sort_by=${req.query.sort || 'popularity.desc'}&with_genres=${selectedGenre}`;

  // Fetch movie data from the API
  try {
    const response = await fetch(apiUrl);
    const movieData = await response.json();

    // Fetch genre names for the selected genre
    const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
    const genreData = await genreResponse.json();

    // Map the genre IDs to their names and create an array of genre names
    return res.send(renderTemplate('server/views/index.liquid', {
      title: 'Home',
      items: movieData.results,
      genre_names: genreData.genres,
      selected_genre: selectedGenre,
      sort: req.query.sort || 'popularity.desc',
      page: page,
      total_pages: movieData.total_pages // Pass total pages
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

app.get('/favorites', async (req, res) => {
  const ids = req.query.ids ? req.query.ids.split(',') : [];

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

// Function to render the Liquid template
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
