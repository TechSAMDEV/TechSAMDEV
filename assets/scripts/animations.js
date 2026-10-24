(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        return;
    }

    const revealTargets = document.querySelectorAll(
        "header, body > #hero, body > section, main > section, .project-card, .pricing-card, .contact-info-card, .contact-form-card, footer"
    );

    if (revealTargets.length === 0) {
        return;
    }

    [".project-card", ".pricing-card", ".contact-info-card, .contact-form-card"].forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.style.setProperty("--motion-delay", `${Math.min(index, 4) * 90}ms`);
        });
    });

    const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("motion-reveal-visible");
                activeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0,
        rootMargin: "0px 0px -48px 0px"
    });

    revealTargets.forEach(element => {
        element.classList.add("motion-reveal");
        observer.observe(element);
    });
})();
