// Variables
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle menu mobile
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animar hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(10px, 10px)' : '';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : '';
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger animation
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// Smooth scroll para links internos
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Pega os valores do formulário
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Aqui você poderia enviar para um backend
    console.log('Mensagem de:', name);
    console.log('Email:', email);
    console.log('Mensagem:', message);
    
    // Mostra uma mensagem de sucesso
    alert(`Obrigado, ${name}! Sua mensagem foi recebida.`);
    
    // Limpa o formulário
    contactForm.reset();
});

// Animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.skill-card, .project-card, .info-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Mudar navbar ao scroll
let lastScrollPosition = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollPosition = currentScroll;
});

// Tipagem no hero
const titleElement = document.querySelector('.hero h1');
const originalText = titleElement.innerHTML;
const highlightSpan = titleElement.querySelector('.highlight');
const afterHighlight = highlightSpan.nextSibling.textContent;

// Efeito de digitação
function typeEffect(element, text, speed = 100) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Ativar efeito de digitação quando chegar na seção
const heroSection = document.querySelector('.hero');
let hasAnimated = false;

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            // Animar o título
            titleElement.style.opacity = '0';
            setTimeout(() => {
                titleElement.style.opacity = '1';
            }, 100);
        }
    });
});

heroObserver.observe(heroSection);

// Contador de scroll para elementos
const counters = {};

window.addEventListener('scroll', () => {
    document.querySelectorAll('.info-item h3').forEach(counter => {
        if (isElementInViewport(counter)) {
            const target = counter.nextElementSibling;
            if (target && !counters[counter.id]) {
                counters[counter.id] = true;
            }
        }
    });
});

// Verificar se elemento está visível na tela
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Scroll suave ao clicar em "Entre em Contato"
document.querySelector('.btn-primary').addEventListener('click', (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contato');
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Efeito hover nos cards de projeto
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

console.log('Portfolio carregado com sucesso! 🎉');
