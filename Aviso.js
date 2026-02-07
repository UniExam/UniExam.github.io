document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // Cambiamos 'active' por 'show' para que coincida con tu CSS
            navMenu.classList.toggle('show');
            
            // Si quieres que las barritas cambien a "X", mantén esta línea:
            hamburger.classList.toggle('active');
        });
    }
});