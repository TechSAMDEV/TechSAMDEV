// Toggle Nav Menu
function toggleMenu() {
	document.getElementById('menu').classList.toggle('show');
}

// Setting scroll behavior to smooth (Only for anchor links with actual IDs, not just "#")
document.querySelectorAll('a[href^="#"]').forEach(link => {
	link.addEventListener('click', function (e) {
		const href = this.getAttribute('href');
		if (href.length > 1) {
			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		}
	});
});

// Update the year of footer
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Scroll to the top button (with safety check if it exists on the page)
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// CONTACT FORM SUBMISSION HANDLER
document.addEventListener("DOMContentLoaded", () => {
	const contactForm = document.getElementById("contact-form");
	const statusDiv = document.getElementById("form-status");
	const submitBtn = document.getElementById("submit-btn");

	if (contactForm) {
		contactForm.addEventListener("submit", async function (e) {
			// 1. Absolutely stop standard page redirect/reload
			e.preventDefault();

			if (!submitBtn || !statusDiv) return;

			// 2. Set loading state & show sending text
			submitBtn.disabled = true;
			submitBtn.textContent = "Sending...";
			statusDiv.textContent = "";
			statusDiv.className = "form-status";

			// 3. Capture form data before clearing
			const formData = new FormData(contactForm);

			try {
				// Send data to Formspree in background via fetch
				const response = await fetch(contactForm.action, {
					method: contactForm.method || "POST",
					body: formData,
					headers: {
						'Accept': 'application/json'
					}
				});

				if (response.ok) {
					// Success message
					statusDiv.textContent = "Message submitted successfully! We will review your message and get back to u.";
					statusDiv.classList.add("status-success");
					
					// Clear all input fields only on success
					contactForm.reset();
				} else {
					const data = await response.json();
					if (Object.hasOwn(data, 'errors')) {
						statusDiv.textContent = data["errors"].map(error => error["message"]).join(", ");
					} else {
						statusDiv.textContent = "Oops! There was a problem submitting your form.";
					}
					statusDiv.classList.add("status-error");
				}
			} catch (error) {
				statusDiv.textContent = "Unable to send message. Please check your network connection.";
				statusDiv.classList.add("status-error");
			} finally {
				// Restore submit button
				submitBtn.disabled = false;
				submitBtn.textContent = "Send Message";
			}
		});
	}
});