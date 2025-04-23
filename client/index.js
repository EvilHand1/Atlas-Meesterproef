import './index.css';

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


const photoContainers = document.querySelectorAll('#photoContainer, #likedPhotosContainer');

photoContainers.forEach(photoContainer => {
  const hasLandscape = photoContainer.querySelector('li .landscape');

  if (hasLandscape) {
    photoContainer.style.flexDirection = 'column';
  } else {
    photoContainer.style.flexDirection = 'row';
  }
});



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
  let colorDivs = document.querySelectorAll('.details-content div'); // Alle divs met de class 'color-info'

  colorDivs.forEach(function (div) {
    let backgroundColor = window.getComputedStyle(div).backgroundColor;
    let rgb = backgroundColor.match(/\d+/g);
    backgroundColor = "#" + ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);

    let luminance = getLuminance(backgroundColor);

    // Pas de tekstkleur aan op basis van de luminantie
    let textColor = luminance > 0.5 ? ' rgba(71, 56, 76, 1)' : 'rgb(251, 240, 255)';
    let textElement = div.querySelector('p'); // Zoek het <p>-element binnen de div
    textElement.style.color = textColor; // Pas de tekstkleur aan
  });
}
window.onload = adjustTextColorForColorDiv;

document.addEventListener("DOMContentLoaded", () => {
  console.log("📜 JavaScript actief");

  const likeButtons = document.querySelectorAll(".likeButton");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  likeButtons.forEach((likeButton) => {
    const photoId = likeButton.getAttribute("data-photo-id");
    const heart = likeButton.querySelector("svg path");
    const svg = likeButton.querySelector("svg");
    let liked = favorites.includes(photoId);

    // Initiele hart status
    heart.setAttribute("fill", liked ? "#47284C" : "transparent");
    heart.setAttribute("stroke", liked ? "transparent" : "#171616");

    likeButton.addEventListener("click", () => {
      liked = !liked;

      if (liked) {
        // Like toevoegen
        if (!favorites.includes(photoId)) {
          favorites.push(photoId);
        }
        console.log(`Toegevoegd: ${photoId}`);

        // Hartje like animatie
        svg.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.3)" },
            { transform: "scale(1)" }
          ],
          {
            duration: 500,
            easing: "ease"
          }
        );
      } else {
        // Like verwijderen
        favorites = favorites.filter(id => id !== photoId);
        console.log(`Verwijderd: ${photoId}`);

        const li = likeButton.closest(".liked-photo");
        if (li) {
          // Foto fade-up verwijderen via Web Animations API
          li.animate(
            [
              { opacity: 1, transform: "translateY(0px)" },
              { opacity: 0, transform: "translateY(-20px)" }
            ],
            {
              duration: 400,
              easing: "ease",
              fill: "forwards"
            }
          ).onfinish = () => {
            li.remove();
          };
        }

        // Hartje unlike animatie
        svg.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(0.8)" },
            { transform: "scale(1)" }
          ],
          {
            duration: 300,
            easing: "ease"
          }
        );
      }

      // Update opslag en hart-styling
      localStorage.setItem("favorites", JSON.stringify(favorites));

      heart.setAttribute("fill", liked ? "#47284C" : "rgb(251, 240, 255)");
      heart.setAttribute("stroke", liked ? "transparent" : "#171616");
    });
  });
});



const openButtons = document.querySelectorAll('[data-modalPhoto]')

openButtons.forEach((button) => {
  button.addEventListener("click", (e)=>{

    // get dialog id
    const id = e.currentTarget.getAttribute('data-modalPhoto')

    // get dialog element
    const dialogElement = document.getElementById(`foto-${id}`)

    // open modal
    if (!('startViewTransition' in document)) {
      dialogElement.showModal()
      return 
    }

    document.startViewTransition(() => {
      dialogElement.showModal()
    })
  })
})