document.addEventListener("DOMContentLoaded", function () {
  const yellowShapes = Array.from(
    document.querySelectorAll(
      'svg [fill="#F9EA3E"], svg [fill="#f9ea3e"], svg .cls-1, svg .cls-2',
    ),
  );
  yellowShapes.forEach((el) => el.classList.add("yellow-anim"));
 
  for (let i = yellowShapes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [yellowShapes[i], yellowShapes[j]] = [yellowShapes[j], yellowShapes[i]];
  }
 
  yellowShapes.forEach((shape, i) => {
    setTimeout(() => {
      shape.setAttribute("fill", "#313131");
      shape.classList.remove("cls-1", "cls-2");
    }, i * 500);
  });
});
 
// window.addEventListener("DOMContentLoaded", () => {
//   const wrapper = document.querySelector(".wrapper");
//   const homes = wrapper.querySelectorAll("#huis").length;
 
//   if (homes >= 4) {
//     const secondsPerHome = 1.5;
//     const minDuration = 20;
//     const maxDuration = 60;
 
//     let duration = homes * secondsPerHome;
//     duration = Math.max(minDuration, Math.min(duration, maxDuration));
 
//     wrapper.style.animationDuration = `${duration}s`;
//   } else {
//     wrapper.style.animation = "none";
//   }
// });


window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".wrapper-container");
  const wrapper = document.querySelector(".wrapper");
  const homes = wrapper.querySelectorAll("#huis").length;

  let scrollPaused = false;

  // 👇 Scrollduur afgeleid van aantal huizen
  const secondsPerHome = 1.5;
  const minDuration = 20;
  const maxDuration = 60;

  let duration = homes * secondsPerHome;
  duration = Math.max(minDuration, Math.min(duration, maxDuration));

  // 👇 Bepaal scrollsnelheid in pixels per frame
  const totalDistance = wrapper.scrollWidth;
  const totalFrames = duration * 60; // 60fps
  const scrollSpeed = totalDistance / totalFrames;
  const isMobile = window.matchMedia("(max-width: 1200px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  if (!isMobile && !prefersReducedMotion) {
  function autoScroll() {
    if (!scrollPaused) {
      container.scrollLeft += scrollSpeed;
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0; // loop terug naar begin
      }
    }
    requestAnimationFrame(autoScroll);
  }

  autoScroll();

let resumeTimeout;

container.addEventListener("mouseenter", () => {
  scrollPaused = true;
  clearTimeout(resumeTimeout); // Stop eventueel bestaande timer
});

container.addEventListener("mouseleave", () => {
  clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(() => {
    scrollPaused = false;
  }, 500); // 2 seconden vertraging
});


  container.addEventListener("wheel", () => {
    scrollPaused = true;
    clearTimeout(container._resumeTimer);
    container._resumeTimer = setTimeout(() => {
      scrollPaused = false;
    }, 2000);
  });

  container.addEventListener("focusin", () => {
  scrollPaused = true;
  clearTimeout(container._resumeTimer);
});


const scrollContainer = document.querySelector(".scroll-container");

// Horizontale scroll met muiswiel
scrollContainer.addEventListener("wheel", (e) => {
  // Alleen horizontaal scrollen bij verticale muisbeweging
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    e.preventDefault(); // Voorkom verticale scroll op pagina
    scrollContainer.scrollLeft += e.deltaY;
  }

  // Pauzeer automatische scroll
  scrollPaused = true;
  clearTimeout(scrollContainer._resumeTimer);
  scrollContainer._resumeTimer = setTimeout(() => {
    scrollPaused = false;
  }, 2000);
}, { passive: false }); // belangrijk: passive false zodat preventDefault werkt

}});



// container.addEventListener("focusout", () => {
//   clearTimeout(container._resumeTimer);
//   container._resumeTimer = setTimeout(() => {
//     scrollPaused = false;
//   }, 2000);
// });