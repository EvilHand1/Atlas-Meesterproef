import './index.css';

console.log('Hello, world!');

document.getElementById('goToFavorites').addEventListener('click', (e) => {
  e.preventDefault();
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    alert('Je hebt nog geen favorieten!');
    return;
  }

  const idsParam = favorites.join(',');
  window.location.href = `/favorites?ids=${idsParam}`;
});



window.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('ul img');

  images.forEach(img => {
    function checkOrientation() {
      if (img.naturalWidth > img.naturalHeight) {
        img.closest('li').classList.add('landscape');
      }
    }

    if (img.complete) {
      checkOrientation(); // al geladen
    } else {
      img.onload = checkOrientation;
    }
  });
});


const photoContainer = document.getElementById('photoContainer');
const hasLandscape = photoContainer.querySelector('li .landscape');

if (hasLandscape) {
  photoContainer.style.flexDirection = 'column';
} else {
  photoContainer.style.flexDirection = 'row';
}


/////////like button////////////////


/////////color////////////////

// Functie om de luminantie van een kleur te berekenen
function getLuminance(hex) {
  // Hex kleur omzetten naar RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  
  // RGB naar schaal van 0 tot 1 omrekenen
  r = r / 255;
  g = g / 255;
  b = b / 255;
  
  // Luminosity berekening
  r = (r <= 0.03928) ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = (g <= 0.03928) ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = (b <= 0.03928) ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  // Luminantie (gemiddelde van de R, G, B waarden)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Functie om de tekstkleur aan te passen voor de div color-info
function adjustTextColorForColorDiv() {
  let colorDivs = document.querySelectorAll('.details-content > div'); // Alle divs met de class 'color-info'
  
  colorDivs.forEach(function(div) {
    let backgroundColor = window.getComputedStyle(div).backgroundColor;
    let rgb = backgroundColor.match(/\d+/g);
    backgroundColor = "#" + ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);
    
    let luminance = getLuminance(backgroundColor);
    
    // Pas de tekstkleur aan op basis van de luminantie
    let textColor = luminance > 0.5 ? 'rgba(35, 31, 36, 1)' : 'rgb(251, 240, 255)';
    let textElement = div.querySelector('p'); // Zoek het <p>-element binnen de div
    textElement.style.color = textColor; // Pas de tekstkleur aan
  });
}

// Pas de tekstkleur aan voor alle color-info divs wanneer de pagina geladen is
window.onload = adjustTextColorForColorDiv;


// const favoriteButtons = document.querySelectorAll('[data-photo-id]')

// favoriteButtons.forEach(favoriteButton =>{
  //   favoriteButton.addEventListener('click', (e) => { 
    //     const newFavoriteId = e.target.getAttribute('data-photo-id');
    //     const oldFavorites = JSON.parse( window.localStorage.getItem('favorites')) || [];
    //     oldFavorites.push(newFavoriteId);
    
    //     window.localStorage.setItem('favorites', JSON.stringify(oldFavorites));
    //     console.log(oldFavorites);
    //   })
    // })
    
  //   const likeButtons = document.querySelectorAll('.likeButton');
    
  //   likeButtons.forEach(likeButton => {
  //     let liked = false;
    
  //     likeButton.addEventListener('click', () => {
  //       const photoId = likeButton.getAttribute('data-photo-id');
  //       const heart = likeButton.querySelector('svg path');
  //       const svg = likeButton.querySelector('svg');
    
  //       liked = !liked;
    
  //       // Gebruik unieke gradient-id per foto
  //       const gradientId = `heartGradient-${photoId}`;
  //       heart.setAttribute('fill', liked ? `url(#${gradientId})` : 'rgb(251, 240, 255)');
  //       heart.setAttribute('stroke', liked ? 'transparent' : '#171616');
    
  //       if (liked) {
  //         svg.classList.add('like-pop');
  //         svg.addEventListener('animationend', () => {
  //           svg.classList.remove('like-pop');
  //         }, { once: true });
  //       }
  //     });
  //   });
  //   const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
  //   favoriteButtons.forEach(button => {
  //     const photoId = button.dataset.photoId;
      
  //     // Zet beginstatus (ingevuld hartje als favoriet)
  //     const isFavorited = favorites.includes(photoId);
  //     updateButtonState(button, isFavorited);
      
  //     // Click event
  //   button.addEventListener('click', (e) => {
  //     const id = e.currentTarget.dataset.photoId;
  //     const index = favorites.indexOf(id);

  //     if (index > -1) {
  //       favorites.splice(index, 1); // verwijderen
  //     } else {
  //       favorites.push(id); // toevoegen
  //     }

  //     localStorage.setItem('favorites', JSON.stringify(favorites));
  //     updateButtonState(e.currentTarget, index === -1); // update visueel
  //   });
  // });


  const likeButtons = document.querySelectorAll('.likeButton');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
// console.log('📂 Favorieten bij start:', favorites); 
likeButtons.forEach(likeButton => {
  const photoId = likeButton.getAttribute('data-photo-id');
  const heart = likeButton.querySelector('svg path');
  const svg = likeButton.querySelector('svg');
  const gradientId = `heartGradient-${photoId}`;

  // Controleer of deze foto al in favorieten zit
  let liked = favorites.includes(photoId);
  console.log(`🖼️ Foto ${photoId} is ${liked ? '' : 'niet '}in favorieten.`);

  heart.setAttribute('fill', liked ? `url(#${gradientId})` : 'rgb(251, 240, 255)');
  heart.setAttribute('stroke', liked ? 'transparent' : '#171616');

  // Eventlistener voor het klikken op de like-button
  likeButton.addEventListener('click', async () => {
    liked = !liked; // Toggle de status van 'liked'

    if (liked) {
      favorites.push(photoId);
      console.log(`➕ Toegevoegd aan favorieten: ${photoId}`);
    } else {
      favorites = favorites.filter(id => id !== photoId);
      console.log(`➖ Verwijderd uit favorieten: ${photoId}`);
    }

    // Sla de favorieten op in localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('📦 Huidige localStorage:', favorites);

    // Update de heart icon kleur
    heart.setAttribute('fill', liked ? `url(#${gradientId})` : 'rgb(251, 240, 255)');
    heart.setAttribute('stroke', liked ? 'transparent' : '#171616');

    // Voeg animatie toe aan het hart als het geliket is
    if (liked) {
      svg.classList.add('like-pop');
      svg.addEventListener('animationend', () => {
        svg.classList.remove('like-pop');
      }, { once: true });
    }
  });
});


// Voeg een klik-event toe om naar de favorietenpagina te gaan
document.getElementById('goToFavorites').addEventListener('click', (e) => {
  e.preventDefault();
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    alert('Je hebt nog geen favorieten!');
    return;
  }

  // Verzend de favorieten als querystring naar de server
  const idsParam = favorites.join(',');
  window.location.href = `/favorites?ids=${idsParam}`;
});
