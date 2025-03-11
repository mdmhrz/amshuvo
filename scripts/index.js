
// Scripts for NAV

document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    function toggleMenu() {
        const isOpen = mobileMenu.classList.contains('translate-x-0');
        mobileMenu.classList.toggle('translate-x-0');
        mobileMenu.classList.toggle('translate-x-full');
        document.body.classList.toggle('menu-open');
        if (!isOpen) {
            // Menu opening animation
            mobileMenuItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease-out';
                    item.style.transitionDelay = `${index * 0.1}s`;
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100);
            });
        }
    }
    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileMenuCloseBtn.addEventListener('click', toggleMenu);
    // Close menu when clicking menu items
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            toggleMenu();
        });
    });
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('translate-x-0') &&
            !mobileMenu.contains(e.target) &&
            !mobileMenuBtn.contains(e.target)) {
            toggleMenu();
        }
    });
});



// Script for Hero Section

document.addEventListener('DOMContentLoaded', function () {
    const texts = ['an SEO Consultant', 'a Keyword Researcher Specialist', 'an On-Page SEO Strategist', 'a Technical SEO Expert', 'a Link building specialist', 'a Content Optimization Expert'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    const typingElement = document.querySelector('.typing-text');
    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, newTextDelay);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(type, isDeleting ? erasingDelay : typingDelay);
        }
    }
    setTimeout(type, newTextDelay);
});




// Script for Journey Sectoin

document.addEventListener('DOMContentLoaded', function () {
    const journeyItems = document.querySelectorAll('.journey-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2
    });
    journeyItems.forEach(item => {
        observer.observe(item);
    });
});




// Personal Section Script

document.addEventListener('DOMContentLoaded', function () {
    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('i').classList.add('animate-spin-slow');
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('i').classList.remove('animate-spin-slow');
        });
        card.addEventListener('click', () => {
            // Add a subtle click animation
            card.classList.add('scale-95');
            setTimeout(() => {
                card.classList.remove('scale-95');
            }, 200);
            // Show a custom tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'fixed top-4 right-4 bg-primary text-white px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300';
            tooltip.textContent = 'Coming soon!';
            document.body.appendChild(tooltip);
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });
});


// Achievement 

document.addEventListener('DOMContentLoaded', function () {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('i');
            icon.classList.add('rotate-bounce');
            setTimeout(() => {
                icon.classList.remove('rotate-bounce');
            }, 1500);
        });
        card.addEventListener('click', () => {
            card.classList.add('scale-95');
            setTimeout(() => {
                card.classList.remove('scale-95');
            }, 200);
            const tooltip = document.createElement('div');
            tooltip.className = 'fixed top-4 right-4 bg-primary text-white px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300';
            tooltip.textContent = 'View detailed statistics';
            document.body.appendChild(tooltip);
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });
});



// All others Scripts


document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('a') && !e.target.closest('button')) {
                const detailsBtn = card.querySelector('button');
                detailsBtn.click();
            }
        });
        const detailsBtn = card.querySelector('button');
        detailsBtn.addEventListener('click', () => {
            const projectTitle = card.querySelector('h3').textContent;
            const projectDesc = card.querySelector('p').textContent;
            const technologies = Array.from(card.querySelectorAll('.flex-wrap span')).map(span => span.textContent);
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
            modal.innerHTML = `
                        <div class="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 transform transition-all">
                        <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold">${projectTitle}</h3>
                        <button class="text-gray-500 hover:text-gray-700">
                        <i class="ri-close-line text-2xl"></i>
                        </button>
                        </div>
                        <div class="space-y-4">
                        <img src="${card.querySelector('img').src}" class="w-full h-64 object-cover rounded-xl" alt="${projectTitle}">
                        <p class="text-gray-600">${projectDesc}</p>
                        <div class="flex flex-wrap gap-2">
                        ${technologies.map(tech => `<span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">${tech}</span>`).join('')}
                        </div>
                        <div class="flex justify-between items-center mt-6 pt-6 border-t">
                        <a href="#" class="bg-primary text-white px-6 py-2 !rounded-button hover:bg-primary/90 transition-colors">Live Demo</a>
                        <a href="#" class="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                        View Source <i class="ri-github-line"></i>
                        </a>
                        </div>
                        </div>
                        </div>
                        `;
            document.body.appendChild(modal);
            modal.querySelector('button').addEventListener('click', () => {
                modal.remove();
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
    const animateElements = document.querySelectorAll('.animate-fadeIn');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const parent = bar.closest('.skill-item');
                const percentage = parent.querySelector('.text-primary').textContent.replace('%', '');
                bar.style.width = percentage + '%';
            }
        });
    }, {
        threshold: 0.2
    });
    document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = '0%';
        skillObserver.observe(bar);
    });
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        console.log('Form submitted:', data);
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg';
        successMessage.textContent = 'Message sent successfully!';
        document.body.appendChild(successMessage);
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
        contactForm.reset();
    });
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        console.log('Newsletter subscription:', email);
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg';
        successMessage.textContent = 'Successfully subscribed to newsletter!';
        document.body.appendChild(successMessage);
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
        newsletterForm.reset();
    });
});






// client Testimonals Scripts

let currentSlide = 0;
const totalSlides = 3;
const slider = document.getElementById('testimonialSlider');
function moveTestimonials(direction) {
    if (direction === 'next') {
        currentSlide = (currentSlide + 1) % totalSlides;
    } else {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    }
    slider.style.transform = `translateX(-${currentSlide * 33.333}%)`;
}
setInterval(() => moveTestimonials('next'), 5000);
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;
            const navLink = document.querySelector(`a[href="#${section.id}"]`);
            if (navLink) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
});
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    this.reset();
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 translate-y-0';
    notification.textContent = 'Message sent successfully!';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.transform = 'translateY(150%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
});



// Script for Services
const services = [
    {
        title: "Technical SEO",
        description: "Comprehensive technical optimization to improve search engine crawlability and indexing. We ensure your website meets all technical requirements for optimal performance.",
        features: [
            "Site Architecture Optimization",
            "Core Web Vitals Enhancement",
            "Mobile Optimization",
            "Schema Markup Implementation",
            "Site Speed Optimization"
        ],
        benefits: [
            "Improved Search Rankings",
            "Better User Experience",
            "Increased Crawl Efficiency",
            "Enhanced Site Performance"
        ],
        image: "https://public.readdy.ai/ai/img_res/2037befd6bc6505408645c134ce8af85.jpg"
    },
    {
        title: "Content Strategy",
        description: "Data-driven content strategy to attract and engage your target audience. We create content that resonates with your users and ranks well in search engines.",
        features: [
            "Keyword Research & Analysis",
            "Content Calendar Planning",
            "Content Optimization",
            "Topic Cluster Creation",
            "Content Performance Tracking"
        ],
        benefits: [
            "Increased Organic Traffic",
            "Higher Engagement Rates",
            "Improved Conversions",
            "Better Brand Authority"
        ],
        image: "https://public.readdy.ai/ai/img_res/6e1e6f0128a5c2e31fe3a7040227e575.jpg"
    },
    {
        title: "Analytics & Reporting",
        description: "Comprehensive analytics and reporting to track your SEO performance and demonstrate ROI from your digital marketing initiatives.",
        features: [
            "Custom Dashboard Creation",
            "KPI Tracking & Analysis",
            "ROI Measurement",
            "Competitor Analysis",
            "Monthly Performance Reports"
        ],
        benefits: [
            "Data-Driven Decisions",
            "Clear Performance Metrics",
            "Competitive Insights",
            "Actionable Recommendations"
        ],
        image: "https://public.readdy.ai/ai/img_res/a0911ca63dc36653c3b6c3b8608e621b.jpg"
    }
];
function showServiceDetails(index) {
    const service = services[index];
    const content = `
<div class="space-y-6">
<img src="${service.image}" alt="${service.title}" class="w-full h-64 object-cover rounded-lg mb-6">
<div class="flex items-center justify-between">
<h3 class="text-2xl font-bold">${service.title}</h3>
<div class="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full text-primary">
<i class="ri-${index === 0 ? 'code' : index === 1 ? 'article' : 'line-chart'}-line ri-xl"></i>
</div>
</div>
<p class="text-gray-600">${service.description}</p>
<div class="grid grid-cols-2 gap-8">
<div>
<h4 class="font-semibold mb-4">Key Features</h4>
<ul class="space-y-2">
${service.features.map(feature => `
<li class="flex items-center gap-2 text-gray-600">
<i class="ri-check-line text-primary"></i>
<span>${feature}</span>
</li>
`).join('')}
</ul>
</div>
<div>
<h4 class="font-semibold mb-4">Benefits</h4>
<ul class="space-y-2">
${service.benefits.map(benefit => `
<li class="flex items-center gap-2 text-gray-600">
<i class="ri-arrow-right-line text-primary"></i>
<span>${benefit}</span>
</li>
`).join('')}
</ul>
</div>
</div>
<div class="mt-8">
<button onclick="closeServiceModal()" class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">Get Started</button>
</div>
</div>
`;
    document.getElementById('serviceContent').innerHTML = content;
    document.getElementById('serviceModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeServiceModal() {
    document.getElementById('serviceModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}
document.getElementById('serviceModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeServiceModal();
    }
});



// Script for Acievements

const certificates = [
    {
        title: "Google SEO Certification",
        issuer: "Google",
        date: "January 2025",
        description: "Advanced certification in Search Engine Optimization covering technical SEO, content optimization, and search analytics.",
        skills: ["Technical SEO", "Content Strategy", "Search Analytics", "Mobile Optimization"],
        projects: "Led 15+ successful SEO campaigns with average traffic increase of 200%",
        image: "https://public.readdy.ai/ai/img_res/18b5b9cf86296c0e38ab39134e520872.jpg"
    },
    {
        title: "HubSpot Advanced",
        issuer: "HubSpot Academy",
        date: "March 2025",
        description: "Comprehensive certification in digital marketing excellence, focusing on inbound methodology and content marketing.",
        skills: ["Inbound Marketing", "Content Strategy", "Lead Generation", "Marketing Automation"],
        projects: "Implemented successful marketing campaigns for 20+ enterprise clients",
        image: "https://public.readdy.ai/ai/img_res/c86cb06a46d8754d35dae3c6e3f44046.jpg"
    },
    {
        title: "Analytics Master",
        issuer: "Analytics Academy",
        date: "February 2025",
        description: "Advanced certification in data analytics and visualization, focusing on actionable insights and reporting.",
        skills: ["Data Analysis", "Visualization", "Reporting", "Predictive Analytics"],
        projects: "Developed analytics frameworks for 25+ high-traffic websites",
        image: "https://public.readdy.ai/ai/img_res/3d32f95cc407209797156c93a92c4f85.jpg"
    }
];
function showCertificateDetails(index) {
    const cert = certificates[index];
    const content = `
<div class="space-y-6">
<img src="${cert.image}" alt="${cert.title}" class="w-full h-64 object-cover rounded-lg mb-6">
<div class="flex items-center justify-between">
<h3 class="text-2xl font-bold">${cert.title}</h3>
<div class="flex items-center gap-2">
<i class="ri-verified-badge-fill text-primary ri-lg"></i>
<span class="text-gray-600">${cert.issuer}</span>
</div>
</div>
<p class="text-gray-600">${cert.description}</p>
<div class="space-y-4">
<div>
<h4 class="font-semibold mb-2">Key Skills</h4>
<div class="flex flex-wrap gap-2">
${cert.skills.map(skill => `
<span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">${skill}</span>
`).join('')}
</div>
</div>
<div>
<h4 class="font-semibold mb-2">Project Experience</h4>
<p class="text-gray-600">${cert.projects}</p>
</div>
<div class="flex items-center text-sm text-gray-500">
<i class="ri-calendar-line mr-2"></i>
<span>Achieved: ${cert.date}</span>
</div>
</div>
</div>
`;
    document.getElementById('certificateContent').innerHTML = content;
    document.getElementById('certificateModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeCertificateModal() {
    document.getElementById('certificateModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}
document.getElementById('certificateModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeCertificateModal();
    }
});


// Script for Footer

document.getElementById('newsletterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300';
        notification.innerHTML = `
    <div class="flex items-center gap-2">
        <i class="ri-check-line"></i>
        <span>Successfully subscribed to newsletter!</span>
    </div>
    `;
        document.body.appendChild(notification);
        this.reset();
        setTimeout(() => {
            notification.style.transform = 'translateY(150%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});
