const steps = document.querySelectorAll(".story-step");
const overlay = document.getElementById("story-overlay");
const title = document.querySelector(".story h1");
const prevBtn = document.getElementById("prevBtn");
let currentStep = 0;
 
function showStep(index) {
  steps.forEach((step) => step.classList.remove("active"));
  steps[index].classList.add("active");
 
  if (index === 0) {
    title.style.display = "block";
    prevBtn.style.display = "none";
  } else {
    title.style.display = "none";
    prevBtn.style.display = "inline-block";
  }
}
 
document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  } else {
    overlay.style.display = "none";
  }
});
 
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});
 
showStep(currentStep);

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.globalTimeline.clear();
  ScrollTrigger.getAll().forEach(t => t.disable(true));
} else {
gsap.from('svg[aria-label="introSVG"] path', {
  drawSVG: 0,
  duration: 30,
  ease: "power1.inOut",
});
}