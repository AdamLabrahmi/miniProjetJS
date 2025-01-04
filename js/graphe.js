document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/statistiques')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Utilisateurs', 'Livreurs', 'Commandes Livrées', 'Commandes En Cours', 'Commandes Annulées', 'Zones', 'Produits'],
                    datasets: [{
                        label: 'Statistiques',
                        data: [
                            data.utilisateurs,
                            data.livreurs,
                            data.commandesLivrees,
                            data.commandesEnCours,
                            data.commandesAnnulees,
                            data.nombreZones,
                            data.nombreProduits
                        ],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
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

function toggleDropdown(id) {
    var dropdown = document.getElementById(id);
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
    } else {
        dropdown.classList.add('hidden');
    }
}