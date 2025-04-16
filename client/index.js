import './index.css';

document.querySelectorAll('.card_image').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();

    const movieId = card.getAttribute('id');
    const targetUrl = `/movies/${movieId}`; // adjust depending on your site

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        window.location.href = targetUrl;
      });
    } else {
      window.location.href = targetUrl;
    }
  });
});

const favBtn = document.querySelector('.addToFavorites');
if (favBtn) {
  favBtn.addEventListener('click', (e) => {
    AddToFavorites(e.target.dataset.id);
  });
}

function AddToFavorites(id, obj) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const btn = document.querySelector('.addToFavorites');

if (btn) { // Safety check
  const id = btn.dataset.id;
  const icon = btn.querySelector('i');

  if (favorites.includes(id)) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.addToFavorites');
  if (!btn) return;

  const id = btn.dataset.id;
  const icon = btn.querySelector('i');

  // Sanity check
  if (!id || !icon) {
    console.warn("Missing movie ID or <i> tag inside button.");
    return;
  }

  // Clean localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(fav => fav); // remove nulls
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Set initial icon
  if (favorites.includes(id)) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
  }

  // Toggle on click
  btn.addEventListener('click', () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(id);

    if (!id) return; // extra safety

    if (index === -1) {
      favorites.push(id);
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    } else {
      favorites.splice(index, 1);
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
});

var favoritesLink = document.querySelector('.goToFavorites');

if (favoritesLink) {
  favoritesLink.addEventListener('click', (e) => {
    goToFavoritesPage();
    console.log('kaas');
  });
}

function goToFavoritesPage() {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Filter out null/undefined/empty
  favorites = favorites.filter(id => id);

  if (favorites.length === 0) {
    alert("No favorites yet!");
    return;
  }

  const query = favorites.join(',');
  window.location.href = `/favorites?ids=${query}`;
}

