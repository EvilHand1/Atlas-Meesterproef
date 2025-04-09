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

  
  