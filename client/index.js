import "./index.css";
 
console.log("Hello, world123");
 
const tooltip = document.getElementById("tooltip");
const links = document.querySelectorAll(".straat-link");
 
links.forEach((link) => {
  const name = link.dataset.straat;
 
  link.addEventListener("mouseenter", (e) => {
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
});
 

document.querySelectorAll('.dropbtn').forEach(button => {
  button.addEventListener('click', function (e) {
      e.preventDefault();
      const dropdown = this.nextElementSibling;
      const isOpen = dropdown.style.display === 'block';
 
      document.querySelectorAll('.dropdown-content').forEach(menu => {
          menu.style.display = 'none';
      });
 
      if (!isOpen) {
          dropdown.style.display = 'block';
      }
  });
});
 
document.addEventListener('click', function (e) {
  if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-content').forEach(menu => {
          menu.style.display = 'none';
      });
  }
});
 
 
 