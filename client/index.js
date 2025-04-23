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

var favoritesLink = document.querySelector('.goToFavorites');

if (favoritesLink) {
  favoritesLink.addEventListener('click', () => {
    window.location.href = '/favorites'; // no query needed anymore
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const btn = document.querySelector('.addToFavorites');
  if (!btn) return;

  const id = btn.dataset.id;
  const icon = btn.querySelector('i');
  if (!id || !icon) return;

  // Get current favorite status from server
  const response = await fetch(`/api/favorites/${id}`);
  const data = await response.json();

  if (data.isFavorite) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
  }

  btn.addEventListener('click', async () => {
    const res = await fetch(`/api/favorites/${id}`, { method: 'POST' });
    const result = await res.json();

    if (result.status === 'added') {
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    } else {
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    }
  });
});
