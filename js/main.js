// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation items on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Function to fetch and display LeetCode stats
async function fetchLeetCodeStats() {
    try {
        const response = await fetch('https://leetcode-stats-api.herokuapp.com/Jian0518');
        const data = await response.json();

        // Update the stats in the DOM with your actual stats
        document.getElementById('ranking').textContent = data.ranking;  // Your LeetCode ranking
        document.getElementById('totalSolved').textContent = data.totalSolved;  // Your total solved problems
        document.getElementById('easySolved').textContent = data.easySolved;   // Your easy problems solved
        document.getElementById('mediumSolved').textContent = data.mediumSolved; // Your medium problems solved
        document.getElementById('hardSolved').textContent = data.hardSolved;    // Your hard problems solved
        document.getElementById('acceptanceRate').textContent = data.acceptanceRate + '%'; // Your acceptance rate
    } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        // Update DOM with error message
        const elements = ['ranking', 'totalSolved', 'easySolved', 'mediumSolved', 'hardSolved', 'acceptanceRate'];
        elements.forEach(id => {
            document.getElementById(id).textContent = 'Error loading data';
        });
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchLeetCodeStats);

// Intersection Observer for section animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Show or hide the scroll-to-top button
window.addEventListener('scroll', () => {
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (window.scrollY > 300) { // Show button after scrolling down 300px
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Scroll to top when the button is clicked
document.getElementById('scrollToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll effect
    });
});

// Scroll to top when the logo is clicked
document.getElementById('logoLink').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll effect
    });
});

// Add this to your JavaScript file
function typeText(element, text, speed, callback) {
    let index = 0;
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    element.appendChild(cursor);

    function type() {
        if (index < text.length) {
            element.insertBefore(
                document.createTextNode(text.charAt(index)),
                cursor
            );
            index++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    
    type();
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.getElementById('name');
    const titleElement = document.getElementById('title');
    
    // Start typing the name
    typeText(nameElement, 'Tee Jian Wei', 100, function() {
        // After name is complete, start typing the title
        typeText(titleElement, 'Fresh Graduate Software Engineer', 100);
    });
});

// Function to handle form submission
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const templateParams = {
            to_email: 'jianwei020518@gmail.com',
            from_name: username,
            from_email: email,
            message: message
        };

        await emailjs.send(
            'service_2sbf16c', // Add your EmailJS service ID
            'template_8tlyp4j', // Add your EmailJS template ID
            templateParams
        );

        alert('Message sent successfully!');
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send message. Please try again later.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
    }
});

// Function to open academic transcript in a new tab
function openUtarTranscript() {
    window.open('resources/academicTranscript_2200692.pdf', '_blank'); // Open PDF in a new tab
}

function openMmuTranscript() {
    window.open('resources/Foundation_Result_Tee Jian Wei.pdf', '_blank'); 
}

// Function to open MUET certification image in a new tab
function openMUETCertification() {
    window.open('images/muet-certification.jpg', '_blank'); // Path to your MUET certification image
}

// Function to open ACA certification image in a new tab
function openACACertification() {
    window.open('images/alibaba-aca-certification.jpg', '_blank'); // Path to your ACA certification image
}

// Function to open ACP certification image in a new tab
function openCertification() {
    window.open('images/alibaba-certification.jpg', '_blank'); // Path to your ACP certification image
}

// Function to open SPM certificate in a new tab
function openSPMCertification() {
    window.open('resources/SPM_Tee Jian Wei.pdf', '_blank'); // Path to your SPM certificate
} 