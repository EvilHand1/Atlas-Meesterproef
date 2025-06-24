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
      shape.setAttribute("fill", "#000");
      shape.classList.remove("cls-1", "cls-2");
    }, i * 500);
  });
});
 
window.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper");
  const homes = wrapper.querySelectorAll("#huis").length;
 
  if (homes >= 4) {
    const secondsPerHome = 1.5;
    const minDuration = 20;
    const maxDuration = 60;
 
    let duration = homes * secondsPerHome;
    duration = Math.max(minDuration, Math.min(duration, maxDuration));
 
    wrapper.style.animationDuration = `${duration}s`;
  } else {
    wrapper.style.animation = "none";
  }
});


