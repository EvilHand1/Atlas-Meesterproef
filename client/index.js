import './index.css';


console.log('Hello, world123');

document.addEventListener("DOMContentLoaded", function () {
  // Verzamel alle gele shapes
  const yellowShapes = Array.from(document.querySelectorAll(
    'svg [fill="#F9EA3E"], svg [fill="#f9ea3e"], svg .cls-1, svg .cls-2'
  ));
  yellowShapes.forEach(el => el.classList.add('yellow-anim'));

  // Shuffle en animatie zoals eerder
  for (let i = yellowShapes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [yellowShapes[i], yellowShapes[j]] = [yellowShapes[j], yellowShapes[i]];
  }

  yellowShapes.forEach((shape, i) => {
    setTimeout(() => {
      shape.setAttribute('fill', '#000');
      // Optioneel: verwijder de class zodat CSS fill niet meer geldt
      shape.classList.remove('cls-1', 'cls-2');
    }, i * 500);
  });
});


const tooltip = document.getElementById('tooltip');
const links = document.querySelectorAll('.straat-link');

links.forEach(link => {
  const name = link.dataset.straat;

  link.addEventListener('mouseenter', (e) => {
    tooltip.style.display = 'block';
    tooltip.textContent = name;
  });

  link.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });

  link.addEventListener('mousemove', (e) => {
    const mapWrapper = document.querySelector('.map-wrapper');
    const rect = mapWrapper.getBoundingClientRect();
    tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
    tooltip.style.top = (e.clientY - rect.top - 10) + 'px';
  });
});


gsap.from('svg path', {
  drawSVG: 0,
  duration: 30,
  ease: "power1.inOut",
});



const steps = document.querySelectorAll('.story-step');
const overlay = document.getElementById('story-overlay');
let currentStep = 0;

function showStep(index) {
  steps.forEach(step => step.classList.remove('active'));
  steps[index].classList.add('active');
}

document.getElementById('nextBtn').addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  } else {
    overlay.style.display = 'none'; // verberg overlay
  }
});

document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});
