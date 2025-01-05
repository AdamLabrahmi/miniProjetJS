document.addEventListener('DOMContentLoaded', function() {
    const languageBtn = document.getElementById('language-btn');
    const languageMenu = document.getElementById('language-menu');

    languageBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien
        languageMenu.classList.toggle('hidden');
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', function(event) {
        if (!languageBtn.contains(event.target) && !languageMenu.contains(event.target)) {
            languageMenu.classList.add('hidden');
        }
    });

    // Fonction pour charger les traductions
    function setLanguage(language) {
        fetch(`../lang/lang-${language}.json`)
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll('[data-i18n]').forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (data[key]) {
                        element.textContent = data[key];
                    }
                });
                document.title = data.title;
            })
            .catch(error => console.error('Error loading language file:', error));
    }

    // Définir la langue par défaut
    setLanguage('fr');

    // Ajouter des écouteurs d'événements pour les liens de langue
    document.querySelectorAll('#language-menu a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const language = this.getAttribute('onclick').match(/'(\w+)'/)[1];
            setLanguage(language);
            languageMenu.classList.add('hidden');
        });
    });
});