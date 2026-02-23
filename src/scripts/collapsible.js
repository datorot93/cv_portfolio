// Shared collapsible descriptions functionality
// Used by both English and Spanish pages

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.expand-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const article = button.closest('article');
      const description = article?.querySelector('.description');
      const srText = button.querySelector('.sr-only');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      if (description) {
        // Toggle state
        button.setAttribute('aria-expanded', String(!isExpanded));
        description.setAttribute('data-collapsed', String(isExpanded));

        // Update screen reader text
        if (srText) {
          const lang = document.documentElement.lang || 'en';
          const showText = lang === 'es' ? 'Mostrar descripción' : 'Show description';
          const hideText = lang === 'es' ? 'Ocultar descripción' : 'Hide description';
          srText.textContent = isExpanded ? showText : hideText;
        }
      }
    });

    // Keyboard support
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
});
