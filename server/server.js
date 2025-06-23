import express from "express";
import fetch from "node-fetch"; // of global fetch bij Node 18+
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Setup voor Liquid
import { Liquid } from "liquidjs";
const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("views", "./server/views");
app.set("view engine", "liquid");

// Static bestanden
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

app.use("/client", express.static(path.join(__dirname, "../client")));
app.use(express.static(path.join(__dirname, "../dist")));

const jsonAdress = "https://fdnd-agency.directus.app/items/atlas_address/";
const jsonPerson = "https://fdnd-agency.directus.app/items/atlas_person/";
const jsonPoster = "https://fdnd-agency.directus.app/items/atlas_poster/";
const jsonFamily = "https://fdnd-agency.directus.app/items/atlas_family/";

app.get("/overons", (req, res) => {
  res.render("overons");
});

app.use(async (req, res, next) => {
  try {
    const addressRes = await fetch(jsonAdress);
    const adressen = (await addressRes.json()).data;

    const straten = [
      ...new Set(adressen.map((adres) => adres.street?.trim()).filter(Boolean)),
    ];

    res.locals.straten = straten; // beschikbaar in alle templates
    next();
  } catch (err) {
    console.error("Fout bij ophalen van adressen:", err);
    res.locals.straten = []; // fallback
    next();
  }
});

// Route
app.get("/", async (req, res) => {
  try {
    const personRes = await fetch(jsonPerson);
    const personen = (await personRes.json()).data;

    res.render("index", { personen });
  } catch (err) {
    console.error(err);
    res.status(500).send("Fout bij ophalen van API");
  }
});

import fs from "fs/promises";

app.get("/verhaal/:naam", async (req, res) => {
  try {
    const naam = decodeURIComponent(req.params.naam);

    const storyPath = path.join(__dirname, "../client/public/story.json");
    const rawData = await fs.readFile(storyPath, "utf-8");
    const storyData = JSON.parse(rawData);

    const persoon = storyData.personen.find((p) => p.naam === naam);

    if (!persoon) {
      return res.status(404).send("Persoon niet gevonden");
    }

    res.render("generic", {
      naam: persoon.naam,
      familie: persoon.familie,
      beroep: persoon.beroep,
      verhaal: persoon.verhaal,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Fout bij ophalen van verhaal");
  }
});

app.get("/:straatnaam", async (req, res) => {
  const straatnaam = req.params.straatnaam;

  try {
    const adressenData = await fetch(
      "https://fdnd-agency.directus.app/items/atlas_address/"
    );
    const adressen = await adressenData.json();
    const huidigAdres = adressen.data.filter(
      (adres) => adres.street?.trim() === straatnaam
    );

    await Promise.all(
      huidigAdres.map(async (adres) => {
        const personen = adres.person;
        if (Array.isArray(personen) && personen.length > 0) {
          const personenData = await Promise.all(
            personen.map(async (persoonId) => {
              const persoonData = await fetch(
                `https://fdnd-agency.directus.app/items/atlas_person/${persoonId}`
              );
              const persoonJson = await persoonData.json();
              return persoonJson.data;
            })
          );
          adres.last_name = personenData[0]?.last_name || "Onbekend";
        } else {
          adres.last_name = "Onbekend";
        }
      })
    );

    // ➕ hier voeg je bodyClass toe
    const bodyClass = `straat-${straatnaam.toLowerCase().replace(/\s+/g, "-")}`;

    res.render("street", {
      huidigAdres,
      straatnaam,
      bodyClass,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Fout bij ophalen van API");
  }
});

app.get("/:straatnaam", async (req, res) => {
  const straatnaam = req.params.straatnaam;

  try {
    const adressenData = await fetch(
      "https://fdnd-agency.directus.app/items/atlas_address/"
    );
    const adressen = await adressenData.json();
    const huidigAdres = adressen.data.filter(
      (adres) => adres.street?.trim() === straatnaam
    );

    await Promise.all(
      huidigAdres.map(async (adres) => {
        const personen = adres.person;
        if (Array.isArray(personen) && personen.length > 0) {
          // Fetch all personen for this adres
          const personenData = await Promise.all(
            personen.map(async (persoonId) => {
              const persoonData = await fetch(
                `https://fdnd-agency.directus.app/items/atlas_person/${persoonId}`
              );
              const persoonJson = await persoonData.json();
              return persoonJson.data;
            })
          );
          // Set last_name from the first person (or adjust as needed)
          adres.last_name = personenData[0]?.last_name
            ? personenData[0].last_name
            : "Onbekend";
        } else {
          adres.last_name = "Onbekend";
        }
      })
    );

    res.render("street", {
      huidigAdres,
      straatnaam,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Fout bij ophalen van API");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});