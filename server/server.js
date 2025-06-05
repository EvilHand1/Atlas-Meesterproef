import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Liquid setup
import { Liquid } from 'liquidjs';
const engine = new Liquid();
app.engine('liquid', engine.express());
app.set('views', './server/views');
app.set('view engine', 'liquid');

// Static bestanden
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/client', express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../dist')));

// API urls
const jsonAdress = 'https://fdnd-agency.directus.app/items/atlas_address/';
const jsonPerson = 'https://fdnd-agency.directus.app/items/atlas_person/';
const jsonFamily = 'https://fdnd-agency.directus.app/items/atlas_family/';

// Home route
app.get('/', async (req, res) => {
  try {
    const [personRes, addressRes] = await Promise.all([
      fetch(jsonPerson),
      fetch(jsonAdress)
    ]);

    const personen = (await personRes.json()).data;
    const adressen = (await addressRes.json()).data;

    const straten = [...new Set(
      adressen.map(adres => adres.street?.trim()).filter(Boolean)
    )];

    res.render('index', {
      personen,
      straten
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Fout bij ophalen van API');
  }
});

// Straat route
app.get('/:straatnaam', async (req, res) => {

  const straatnaam = req.params.straatnaam;

  try {
    const adressenData = await fetch('https://fdnd-agency.directus.app/items/atlas_address/');
    const adressen = await adressenData.json();
    const huidigAdres = adressen.data.filter(adres => adres.street?.trim() === straatnaam);

    await Promise.all(huidigAdres.map(async (adres) => {
      const personen = adres.person;
      if (Array.isArray(personen) && personen.length > 0) {
        // Fetch all personen for this adres
        const personenData = await Promise.all(personen.map(async (persoonId) => {
          const persoonData = await fetch(`https://fdnd-agency.directus.app/items/atlas_person/${persoonId}`);
          const persoonJson = await persoonData.json();
          return persoonJson.data;
        }));
        // Set last_name from the first person (or adjust as needed)
        adres.last_name = personenData[0]?.last_name ? personenData[0].last_name : 'Onbekend';
      } else {
        adres.last_name = 'Onbekend';
      }
    }));

    res.render('street', {
      huidigAdres,
      straatnaam
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Fout bij ophalen van API');
  }

})

const port = 3000;
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
