document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour récupérer les statistiques depuis le serveur
    function recupererStatistiques() {
        fetch('http://localhost:3000/statistiques')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des statistiques');
                }
                return response.json();
            })
            .then(statistiques => {
                document.getElementById('stat-utilisateurs').textContent = statistiques.utilisateurs;
                document.getElementById('stat-livreurs').textContent = statistiques.livreurs;
                document.getElementById('stat-commandes-livrees').textContent = statistiques.commandesLivrees;
                document.getElementById('stat-commandes-en-cours').textContent = statistiques.commandesEnCours;
                document.getElementById('stat-commandes-annulees').textContent = statistiques.commandesAnnulees;
                document.getElementById('stat-nombre-zones').textContent = statistiques.nombreZones;
                document.getElementById('stat-nombre-produits').textContent = statistiques.nombreProduits;
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des statistiques:', error);
                alert('Erreur lors de la récupération des statistiques.');
            });
    }

    // Appeler la fonction pour récupérer les statistiques lorsque la page se charge
    recupererStatistiques();
});

function toggleDropdown(id) {
    var dropdown = document.getElementById(id);
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
    } else {
        dropdown.classList.add('hidden');
    }
}