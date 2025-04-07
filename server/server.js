import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

// import { createClient } from 'pexels';

const apiKey = process.env.API_KEY
// const client = createClient(apiKey);

const apiUrl='https://api.unsplash.com/photos/?client_id='+apiKey

console.log(apiUrl)

const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

app
.use(logger())
.use('/', sirv('dist'))
.listen(3000, () => console.log('Server available on http://localhost:3000'));

app.get('/', async (req, res) => {
  const data = await fetch(apiUrl)
  const jsonData = await data.json()
  console.log(jsonData)
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', photos: jsonData }));
});

app.get('/users/:id/', async (req, res) => {
  const id = req.params.id;
  const usersAPIEndpoint = 'https://api.unsplash.com/users/' + id +'?client_id='+apiKey
  console.log(usersAPIEndpoint)
  const profile = data[id];

  const data = await fetch(usersAPIEndpoint)
  const jsonDataId = await data.json()
  console.log(jsonDataId)
  if (!profile) {
    return res.status(404).send('Not found');
  }
  return res.send(renderTemplate('server/views/index.liquid', { title: 'UserProfile', profile: jsonDataId }));
});

const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

