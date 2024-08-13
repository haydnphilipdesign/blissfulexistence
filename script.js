document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Header background change on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(168, 216, 234, 1)';
        } else {
            header.style.backgroundColor = 'rgba(168, 216, 234, 0.9)';
        }
    });

    // Form validation and submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(form)) {
                if (form.id === 'contact-form') {
                    alert('Thank you for your message. We will get back to you soon!');
                    form.reset();
                } else if (form.id === 'login-form') {
                    document.getElementById('login-form').style.display = 'none';
                    document.getElementById('client-dashboard').style.display = 'block';
                    simulateClientDashboard();
                }
            }
        });
    });

    // Form validation function
    const validateForm = (form) => {
        let isValid = true;
        form.querySelectorAll('input, textarea').forEach(field => {
            if (field.hasAttribute('required') && !field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMessage = document.createElement('span');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = 'This field is required';
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }
            } else {
                field.classList.remove('error');
                if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                    field.nextElementSibling.remove();
                }
            }
        });
        return isValid;
    };

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    showTestimonial(currentTestimonial);
    setInterval(nextTestimonial, 5000);

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Simulated client dashboard data
    const simulateClientDashboard = () => {
        const upcomingSessions = document.getElementById('upcoming-sessions');
        const documents = document.getElementById('documents');
        const messages = document.getElementById('messages');

        if (upcomingSessions) {
            upcomingSessions.innerHTML += `
                <p>Equine Gestalt Therapy - August 15, 2024, 2:00 PM</p>
                <p>Holistic Healing Session - August 22, 2024, 10:00 AM</p>
            `;
        }

        if (documents) {
            documents.innerHTML += `
                <p><a href="#">Therapy Guide.pdf</a></p>
                <p><a href="#">Session Notes - August 1, 2024.docx</a></p>
            `;
        }

        if (messages) {
            messages.innerHTML += `
                <p>New message from your therapist - August 10, 2024</p>
                <p>Appointment confirmation - August 8, 2024</p>
            `;
        }
    };

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.content-section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => sectionObserver.observe(section));
});
