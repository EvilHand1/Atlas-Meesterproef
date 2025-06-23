import "./index.css";
 
console.log("Hello, world123");

// 🎨 Gele SVG-shapes animeren
document.addEventListener("DOMContentLoaded", function () {
  const yellowShapes = Array.from(
    document.querySelectorAll(
      'svg [fill="#F9EA3E"], svg [fill="#f9ea3e"], svg .cls-1, svg .cls-2'
    )
  );

  yellowShapes.forEach((el) => el.classList.add("yellow-anim"));

  for (let i = yellowShapes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [yellowShapes[i], yellowShapes[j]] = [yellowShapes[j], yellowShapes[i]];
  }

  // Check number of houses
  const wrapper = document.querySelector(".wrapper");
  const homes = wrapper ? wrapper.querySelectorAll("#huis").length : 0;
  let duration = 0.5; // fallback

  if (homes === 1) {
    duration = 20;
  } else if (homes >= 2 && window.innerWidth >= 1024) {
    const secondsPerHome = 1.5;
    const minDuration = 20;
    const maxDuration = 60;
    duration = Math.max(minDuration, Math.min(homes * secondsPerHome, maxDuration));
  } else {
    duration = 0.5;
  }

  yellowShapes.forEach((shape, i) => {
    setTimeout(() => {
      shape.setAttribute("fill", "#000");
      shape.classList.remove("cls-1", "cls-2");
    }, (i * duration * 1000) / yellowShapes.length);
  });
});

// ⏱ Animatieduur op basis van aantal huizen (alleen desktop)
window.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper");
  const homes = wrapper.querySelectorAll("#huis").length;

  if (homes >= 4 && window.innerWidth >= 1024) {
    const secondsPerHome = 1.5;
    const minDuration = 20;
    const maxDuration = 60;

    let duration = homes * secondsPerHome;
    duration = Math.max(minDuration, Math.min(duration, maxDuration));

    wrapper.style.animationDuration = `${duration}s`;
  } else if (window.innerWidth >= 1024) {
    wrapper.style.animation = "none";
  }
});

// 🧠 Tooltip functionaliteit voor straatnamen
const tooltip = document.getElementById("tooltip");
const links = document.querySelectorAll(".straat-link");

links.forEach((link) => {
  const name = link.dataset.straat;

  link.addEventListener("mouseenter", () => {
    tooltip.style.display = "block";
    tooltip.textContent = name;
  });

  link.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });

  link.addEventListener("mousemove", (e) => {
    const mapWrapper = document.querySelector(".map-wrapper");
    const rect = mapWrapper.getBoundingClientRect();
    tooltip.style.left = e.clientX - rect.left + 10 + "px";
    tooltip.style.top = e.clientY - rect.top - 10 + "px";
  });

  link.addEventListener("focus", () => {
    tooltip.style.display = "block";
    tooltip.textContent = name;

    const mapWrapper = document.querySelector(".map-wrapper");
    const rect = mapWrapper.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    tooltip.style.left = linkRect.left - rect.left + 10 + "px";
    tooltip.style.top = linkRect.top - rect.top - 10 + "px";
  });

  link.addEventListener("blur", () => {
    tooltip.style.display = "none";
  });
});

// ✍️ SVG animatie via GSAP
gsap.from('svg[aria-label="introSVG"] path', {
  drawSVG: 0,
  duration: 30,
  ease: "power1.inOut",
});

// 📚 Story overlay stappen doorlopen
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

// 📂 Dropdown-menu functionaliteit
document.querySelectorAll(".dropbtn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const dropdown = this.nextElementSibling;
    const isOpen = dropdown.style.display === "block";

    document.querySelectorAll(".dropdown-content").forEach((menu) => {
      menu.style.display = "none";
    });

    if (!isOpen) {
      dropdown.style.display = "block";
    }
  });
});

document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown-content").forEach((menu) => {
      menu.style.display = "none";
    });
  }
});

// 🖥 Overlay-scherm bij eerste bezoek
window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay-screen");
  if (localStorage.getItem("overlayShown")) {
    overlay.classList.add("hide");
  } else {
    overlay.classList.remove("hide");
    overlay.addEventListener("click", () => {
      overlay.classList.add("hide");
      localStorage.setItem("overlayShown", "true");
    });
  }
});

document.querySelectorAll(".sidebar-link").forEach((link) => {
  const straatNaam = link.dataset.straat;

  link.addEventListener("mouseenter", () => {
    const matchingPath = document.querySelector(
      `.straat-link[data-straat="${straatNaam}"] .straat-path`
    );
    if (matchingPath) matchingPath.classList.add("highlight");
  });

  link.addEventListener("mouseleave", () => {
    const matchingPath = document.querySelector(
      `.straat-link[data-straat="${straatNaam}"] .straat-path`
    );
    if (matchingPath) matchingPath.classList.remove("highlight");
  });
});