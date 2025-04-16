# API

Maker: **Tymo Smids**

Datum: *2025/03/25* - *2025/04/29*

## Randvoorwaarden

- Minimaal een overzichts- en detailpagina;
- Gebouwd in TinyHTTP + Liquid;
- Minimaal een content API;
- Minimaal twee Web API's.

## Mijn project

De pagina's die ik heb zijn: een homepagina, detailpagina en een favorieten pagina. Het project is gebouwd in **TinyHTTP** en **Liquid** is de templating taal die is gebruikt. De **content API** die is gebruikt is de `MovieDB API`.

### Verbinden met de API

De API key is opgeslagen in het `.env` bestand. Dit bestand staat in de `.gitignore`. Dit zorgt ervoor dat de key veilig wordt opgeslagen want de bestanden in de .gitignore worden niet meegestuurd naar Github. Als dit niet wordt gedaan kan iedereen bij de api key en zelf request afvuren.

```js
// ApiKey and URL for The Movie Database API
const apiKey = process.env.movieDB_APIKey;
const apiUrl = 'https://api.themoviedb.org/3/discover/movie';
```

Als de `apiUrl` direct in de browser zou worden gezet krijg je een Json bestand terug. Dit bestand is ook wat je krijgt als je een `Fetch()` afvuurt.

```js
  const response = await fetch(movieDetailsUrl);
  const item = await response.json();
```

De data die je terugkrijgt kan je nu gebruiken om de website te vullen.

```js
<article class="card">
  <img class="card__image" id="movie_{{ item.id }}" style="view-transition-name: movie_{{ item.id }}"
       src="https://image.tmdb.org/t/p/original{{ item.poster_path }}" 
       alt="{{ item.title }}" 
       title="{{ item.title }}" 
       loading="lazy"/>
  <h2 class="h2">{{ item.title }}</h2>
</article>
```

## CSS

Alle `liquid` bestanden hebben een los css bestand zodat het compact en los van elkaar staat. De kaarten worden via een render template.

```liquid
{% render 'server/components/card/card.liquid', item: item %}
```

Om de css die ik wil aanroepen voor elk bestand zet ik een algemene class die alleen voorkomt bij die pagina. Dit zorgt ervoor dat de css alleen wordt aangeroepen als dit nodig is.

```css
/* Detail pagina */
.movieDetails {}
```

## Link

[Link naar project](tymonl.github.io/API-2425/)
