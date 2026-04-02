document.addEventListener("DOMContentLoaded", () => {
    // Navbar scroll effect
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("appear");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const faders = document.querySelectorAll(".fade-in, .fade-in-up");
    faders.forEach(fader => {
        observer.observe(fader);
    });

    // Form Submission to Google Forms
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = document.getElementById("submitBtn");
            const originalText = btn.textContent;
            
            btn.textContent = "Sending...";
            btn.style.backgroundColor = "#fff";
            btn.style.color = "#000";
            
            const url = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSexajXtOcP01LQaniG7cBvestIFQ20iDh4eyG6BH3lgAOwEuw/formResponse";
            
            const formData = new FormData();
            formData.append("entry.370089765", document.getElementById("name").value);
            formData.append("entry.1154428744", document.getElementById("email").value);
            formData.append("entry.2127871152", document.getElementById("message").value);
            
            const dateVal = document.getElementById("date").value;
            if (dateVal) {
                const parts = dateVal.split("-");
                if (parts.length === 3) {
                    formData.append("entry.1432798832_year", parts[0]);
                    formData.append("entry.1432798832_month", parts[1]);
                    formData.append("entry.1432798832_day", parts[2]);
                }
            }
            
            fetch(url, {
                method: "POST",
                mode: "no-cors",
                body: formData
            }).then(() => {
                btn.textContent = "Message Sent!";
                btn.style.backgroundColor = "#4BB543"; // Success Green
                btn.style.color = "#fff";
                contactForm.reset();
                
                const modal = document.getElementById("confirmationModal");
                if (modal) {
                    modal.classList.add("active");
                }
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = "";
                    btn.style.color = "";
                }, 3000);
            }).catch(error => {
                console.error("Error submitting form:", error);
                btn.textContent = "Error Sending";
                btn.style.backgroundColor = "#ff3333";
                btn.style.color = "#fff";
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = "";
                    btn.style.color = "";
                }, 3000);
            });
        });
    }

    // Modal Popup Logic
    const confirmationModal = document.getElementById("confirmationModal");
    const closeModalBtn = document.getElementById("closeModalBtn");

    if (confirmationModal && closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            confirmationModal.classList.remove("active");
        });

        confirmationModal.addEventListener("click", (e) => {
            if (e.target === confirmationModal) {
                confirmationModal.classList.remove("active");
            }
        });
    }
});
