// Toggle Nav Menu
function toggleMenu() {
	document.getElementById('menu').classList.toggle('show');
}

// Setting scroll behavior to smooth 
document.querySelectorAll('a[href^="#"]').forEach(link => {
	link.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
		}
	});
});

// update the year of footer
const currentYear = new Date().getFullYear();
document.getElementById('year').textContent = currentYear;

// Scroll to the top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show button when page is scrolled down 300px
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

// Scroll to top smoothly when clicked
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});