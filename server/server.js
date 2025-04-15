import 'dotenv/config'

import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import bodyParser from 'body-parser';
import sirv from 'sirv';

const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

const favourites = []

app
  .use(logger())
  .use(bodyParser.urlencoded())
  .use('/', sirv('dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

app.get('/', async (req, res) => {
  const movies = await fetchData('https://api.themoviedb.org/3/discover/movie')

  const success = req.query.success;

  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', movies: movies.results, success: success }));
});

app.get('/search/', async (req, res) => {
  const query = req.query.q;
  const movies = await fetchData('https://api.themoviedb.org/3/search/movie?query=' + query)

  const requestedWithJs = req.headers['x-requested-with'] === 'XMLHttpRequest';

  if (requestedWithJs) {
    return res.send(renderTemplate('server/components/search-results/search-results.liquid', {
      results: movies.results,
    }));
  } else {
    return res.send(renderTemplate('server/views/search.liquid', {
      title: 'Search',
      query: query,
      results: movies.results,
      totalResults: movies.total_results
    }));
  }
})

app.post('/favourite/', async (req, res) => {
  const body = req.body;
  favourites.push(body.id)
  return res.redirect(req.headers.referer + '?success=true');
})

app.get('/plant/:id/', async (req, res) => {
  const id = req.params.id;
  const item = data[id];
  if (!item) {
    return res.status(404).send('Not found');
  }
  return res.send(renderTemplate('server/views/detail.liquid', {
    title: `Detail page for ${id}`,
    item: item
  }));
});

const renderTemplate = (template, data) => {
  return engine.renderFileSync(template, data);
};



function fetchData(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`
    }
  })
    .then(response => response.json())
}
