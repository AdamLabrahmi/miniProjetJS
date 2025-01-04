document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/statistiques')
        .then(response => response.json())
        .then(data => {
            // Mettre à jour les statistiques dans le HTML
            document.getElementById('stat-total-livreurs').textContent = data.livreurs;
            document.getElementById('stat-total-clients').textContent = data.utilisateurs;
            document.getElementById('stat-total-produits').textContent = data.nombreProduits;
            document.getElementById('stat-total-zones').textContent = data.nombreZones;

            // Créer le graphique circulaire
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Commandes Livrées', 'Commandes En Cours', 'Commandes Annulées'],
                    datasets: [{
                        label: 'Statistiques des Commandes',
                        data: [
                            data.commandesLivrees,
                            data.commandesEnCours,
                            data.commandesAnnulees
                        ],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    return `${label}: ${value}`;
                                }
                            }
                        }
                    }
                }
            });

            // Télécharger le graphique en tant que PNG
            document.getElementById('download-png').addEventListener('click', function() {
                const link = document.createElement('a');
                link.href = myChart.toBase64Image();
                link.download = 'graphique.png';
                link.click();
            });

            // Télécharger le graphique en tant que PDF
            document.getElementById('download-pdf').addEventListener('click', function() {
                html2canvas(document.getElementById('myChart')).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('landscape');
                    const imgWidth = 290; // Largeur de l'image dans le PDF
                    const pageHeight = pdf.internal.pageSize.height;
                    const imgHeight = canvas.height * imgWidth / canvas.width;
                    let heightLeft = imgHeight;
                    let position = 0;

                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;

                    while (heightLeft >= 0) {
                        position = heightLeft - imgHeight;
                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }

                    pdf.save('graphique.pdf');
                });
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des statistiques:', error);
        });
});

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
}

function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    dropdown.classList.toggle('hidden');
}