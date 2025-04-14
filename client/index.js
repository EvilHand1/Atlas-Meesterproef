import './index.css';

console.log('Hello, world!');


window.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('#photoContainer img');

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

const likeButtons = document.querySelectorAll('.likeButton');

likeButtons.forEach(likeButton => {
  let liked = false;

  likeButton.addEventListener('click', () => {
    const photoId = likeButton.getAttribute('data-photo-id');
    const heart = likeButton.querySelector('svg path');
    const svg = likeButton.querySelector('svg');

    liked = !liked;

    // Gebruik unieke gradient-id per foto
    const gradientId = `heartGradient-${photoId}`;
    heart.setAttribute('fill', liked ? `url(#${gradientId})` : 'transparent');
    heart.setAttribute('stroke', liked ? 'transparent' : '#171616');

    if (liked) {
      svg.classList.add('like-pop');
      svg.addEventListener('animationend', () => {
        svg.classList.remove('like-pop');
      }, { once: true });
    }
  });
});



// likeButton.addEventListener('click', () => {
//   const photoId = likeButton.getAttribute('data-photo-id');
//   const heart = likeButton.querySelector('svg path');
//   const svg = likeButton.querySelector('svg');

//   liked = !liked;

//   heart.setAttribute('fill', liked ? 'rgba(71, 56, 76, 1)' : 'transparent');
//   heart.setAttribute('stroke', liked ? 'rgba(71, 56, 76, 1)' : '#171616');

//   if (liked) {
//     svg.classList.add('like-pop');
//     svg.addEventListener('animationend', () => {
//       svg.classList.remove('like-pop');
//     }, { once: true });

//     // ✅ Voeg foto toe aan localStorage
//     const likedPhotos = JSON.parse(localStorage.getItem('likedPhotos') || '[]');
//     likedPhotos.push({
//       id: photoId,
//       src: likeButton.closest('form').querySelector('img').src,
//       alt: likeButton.closest('form').querySelector('img').alt,
//       username: likeButton.closest('form').querySelector('a').href,
//       name: likeButton.closest('form').querySelector('h2').textContent,
//     });
//     localStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
//   } else {
//     // ❌ Verwijder foto als unliked
//     const likedPhotos = JSON.parse(localStorage.getItem('likedPhotos') || '[]');
//     const updatedPhotos = likedPhotos.filter(photo => photo.id !== photoId);
//     localStorage.setItem('likedPhotos', JSON.stringify(updatedPhotos));
//   }
// });

// const container = document.getElementById('likedPhotosContainer');
//   const likedPhotos = JSON.parse(localStorage.getItem('likedPhotos') || '[]');

//   if (likedPhotos.length === 0) {
//     container.innerHTML = '<p>Je hebt nog geen foto geliket.</p>';
//   } else {
//     likedPhotos.forEach(photo => {
//       const li = document.createElement('li');
//       li.innerHTML = `
//         <a href="${photo.username}">
//           <img src="${photo.src}" alt="${photo.alt}">
//           <p>${photo.name}</p>
//         </a>
//       `;
//       container.appendChild(li);
//     });
//   }