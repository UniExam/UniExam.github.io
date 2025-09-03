document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll para enlaces de ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animar tarjetas (feature y course) al hacer scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const courseCards = document.querySelectorAll('.course-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150); // efecto escalonado
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    [...featureCards, ...courseCards].forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
    const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("show");
  });

    // Inicializar Swiper
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.course-swiper', {
            loop: true,
            grabCursor: true,
            slidesPerView: 1,
            spaceBetween: 30,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40
                }
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    } else {
        console.warn('Swiper no está cargado. Asegúrate de incluir la librería Swiper.');
    }

});
