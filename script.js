document.addEventListener('DOMContentLoaded', () => {
    // Dynamic month for urgency banner
    const monthEl = document.getElementById('current-month');
    if (monthEl) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
        monthEl.textContent = months[new Date().getMonth()];
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Form submission handling
    const form = document.getElementById('enquiry-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            // Show loading state
            btn.innerText = 'Sending...';
            btn.disabled = true;

            const formData = new FormData(form);
            const action = form.getAttribute('action');

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    formStatus.innerText = "Thank you! We'll be in touch within 24 hours to schedule your free consult.";
                    formStatus.style.color = "#4CAF50";
                    formStatus.style.marginTop = "1rem";
                    form.reset();
                    btn.innerText = 'Sent!';

                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.disabled = false;
                    }, 3000);
                } else {
                    formStatus.innerText = data.message || "Oops! There was a problem submitting your form";
                    formStatus.style.color = "#ff4d4d";
                    formStatus.style.marginTop = "1rem";
                    btn.innerText = originalText;
                    btn.disabled = false;
                }
            } catch (error) {
                formStatus.innerText = "Oops! There was a problem connecting to the server.";
                formStatus.style.color = "#ff4d4d";
                formStatus.style.marginTop = "1rem";
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }

    // Dynamic header background on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 0';
            header.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.background = 'rgba(5, 5, 5, 0.8)';
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Exit Intent Popup
    const exitPopup = document.getElementById('exit-popup');
    const exitClose = document.querySelector('.exit-close');
    const exitFormLink = document.getElementById('exit-form-link');
    let exitShown = false;

    // Show popup when mouse leaves viewport (desktop only)
    document.addEventListener('mouseout', (e) => {
        if (!exitShown && e.clientY < 10 && window.innerWidth > 768) {
            exitPopup.classList.add('active');
            exitShown = true;
            // Store in session so it doesn't show again
            sessionStorage.setItem('exitPopupShown', 'true');
        }
    });

    // Check if already shown this session
    if (sessionStorage.getItem('exitPopupShown')) {
        exitShown = true;
    }

    // Close popup handlers
    if (exitClose) {
        exitClose.addEventListener('click', () => {
            exitPopup.classList.remove('active');
        });
    }

    if (exitFormLink) {
        exitFormLink.addEventListener('click', () => {
            exitPopup.classList.remove('active');
        });
    }

    // Close on background click
    if (exitPopup) {
        exitPopup.addEventListener('click', (e) => {
            if (e.target === exitPopup) {
                exitPopup.classList.remove('active');
            }
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && exitPopup.classList.contains('active')) {
            exitPopup.classList.remove('active');
        }
    });

    // Smooth scroll for sticky CTA (close popup if clicking form link)
    document.querySelectorAll('a[href="#book"]').forEach(link => {
        link.addEventListener('click', () => {
            if (exitPopup && exitPopup.classList.contains('active')) {
                exitPopup.classList.remove('active');
            }
        });
    });

    // WhatsApp Chat Bubble
    const whatsappBubble = document.getElementById('whatsapp-bubble');
    const bubbleClose = document.getElementById('bubble-close');

    if (whatsappBubble && bubbleClose) {
        // Check if bubble was dismissed this session
        if (sessionStorage.getItem('whatsappBubbleClosed')) {
            whatsappBubble.classList.add('hidden');
        } else {
            // Show bubble after 3 seconds
            whatsappBubble.classList.add('hidden');
            setTimeout(() => {
                whatsappBubble.classList.remove('hidden');
            }, 3000);
        }

        // Close bubble on X click
        bubbleClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            whatsappBubble.classList.add('hidden');
            sessionStorage.setItem('whatsappBubbleClosed', 'true');
        });
    }
});
