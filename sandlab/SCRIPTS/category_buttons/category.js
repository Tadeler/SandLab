const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordion = header.parentElement;
        accordion.classList.toggle('active');
    });
});