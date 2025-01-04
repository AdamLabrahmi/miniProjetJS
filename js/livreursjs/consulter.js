function consulterLivreur() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;

    if (nom && prenom) {
        fetch(`http://localhost:3000/livreurs`)
            .then(response => response.json())
            .then(livreurs => {
                const livreur = livreurs.find(l => l.nom.toLowerCase() === nom.toLowerCase() && l.prenom.toLowerCase() === prenom.toLowerCase());
                if (livreur && livreur.disponibilite === 'Disponible') {
                    fetch(`http://localhost:3000/commandes`)
                        .then(response => response.json())
                        .then(commandes => {
                            const commandesLivreur = commandes.filter(c => c.livreur_id === livreur.id);
                            const commandesLivrees = commandesLivreur.filter(c => c.statut === 'Livrée').length;
                            const commandesEnCours = commandesLivreur.filter(c => c.statut === 'En cours').length;
                            const commandesAnnulees = commandesLivreur.filter(c => c.statut === 'Annulée').length;

                            document.getElementById('resultat').innerHTML = `
                                <div class="p-4 bg-white rounded-lg shadow-md">
                                    <p class="font-bold text-lg"><strong>Nom:</strong> ${livreur.nom}</p>
                                    <p class="font-bold text-lg"><strong>Prénom:</strong> ${livreur.prenom}</p>
                                    <p class="text-gray-700"><strong>Téléphone:</strong> ${livreur.telephone || 'N/A'}</p>
                                    <p class="text-gray-700"><strong>Nombre de commandes:</strong> ${commandesLivreur.length}</p>
                                    <p class="text-green-500"><strong>Commandes livrées:</strong> ${commandesLivrees}</p>
                                    <p class="text-yellow-500"><strong>Commandes en cours:</strong> ${commandesEnCours}</p>
                                    <p class="text-red-500"><strong>Commandes annulées:</strong> ${commandesAnnulees}</p>
                                </div>
                            `;
                        })
                        .catch(error => {
                            console.error('Erreur lors de la récupération des commandes:', error);
                            document.getElementById('resultat').innerHTML = '<p class="text-red-500">Erreur lors de la récupération des commandes.</p>';
                        });
                } else {
                    document.getElementById('resultat').innerHTML = '<p class="text-red-500">Livreur non trouvé ou non disponible.</p>';
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des livreurs:', error);
                document.getElementById('resultat').innerHTML = '<p class="text-red-500">Erreur lors de la récupération des livreurs.</p>';
            });
    } else {
        document.getElementById('resultat').innerHTML = '<p class="text-red-500">Veuillez entrer le nom et le prénom du livreur.</p>';
    }
}