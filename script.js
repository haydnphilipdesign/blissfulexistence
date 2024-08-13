document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const loginForm = document.getElementById('login-form');

    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(contactForm)) {
                alert('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            }
        });
    }

    // Login Form
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(loginForm)) {
                alert('Login successful.');
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('client-dashboard').style.display = 'block';
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple form validation
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                input.setAttribute('aria-invalid', 'true');
            } else {
                input.classList.remove('error');
                input.removeAttribute('aria-invalid');
            }
        });

        return isValid;
    };

    // Apply validation to all forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Simulated client dashboard data
    const simulateClientDashboard = () => {
        const upcomingSessions = document.getElementById('upcoming-sessions');
        const documents = document.getElementById('documents');
        const messages = document.getElementById('messages');

        // Simulated upcoming sessions
        upcomingSessions.innerHTML += `
            <p>Equine Gestalt Therapy - August 15, 2024, 2:00 PM</p>
            <p>Holistic Healing Session - August 22, 2024, 10:00 AM</p>
        `;

        // Simulated documents
        documents.innerHTML += `
            <p><a href="#">Therapy Guide.pdf</a></p>
            <p><a href="#">Session Notes - August 1, 2024.docx</a></p>
        `;

        // Simulated messages
        messages.innerHTML += `
            <p>New message from your therapist - August 10, 2024</p>
            <p>Appointment confirmation - August 8, 2024</p>
        `;
    };

    // Call this function when the client successfully logs in
    simulateClientDashboard();
});
