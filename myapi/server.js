const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
app.use(bodyParser.json());
// app.use(cors());

// Données simulées
let livreurs = [
    { id: 1, nom: "Ali", prenom: "Benomar", telephone: "0612345678", disponibilite: "Disponible", vehicule: "Moto", zone_id: 1 },
    { id: 2, nom: "Sara", prenom: "El Mansouri", telephone: "0623456789", disponibilite: "Occupé", vehicule: "Voiture", zone_id: 2 },
    { id: 3, nom: "Hassan", prenom: "Ouali", telephone: "0634567890", disponibilite: "Disponible", vehicule: "Camion", zone_id: 3 },
    { id: 4, nom: "Zineb", prenom: "Bouchra", telephone: "0645678901", disponibilite: "Occupé", vehicule: "Vélo", zone_id: 4 },
    { id: 5, nom: "Youssef", prenom: "Khalid", telephone: "0656789012", disponibilite: "Disponible", vehicule: "Moto", zone_id: 5 },
    { id: 6, nom: "Amine", prenom: "Rachid", telephone: "0667890123", disponibilite: "Occupé", vehicule: "Voiture", zone_id: 6 },
    { id: 7, nom: "Naima", prenom: "Fadwa", telephone: "0678901234", disponibilite: "Disponible", vehicule: "Camion", zone_id: 7 },
    { id: 8, nom: "Hamid", prenom: "Mehdi", telephone: "0689012345", disponibilite: "Disponible", vehicule: "Vélo", zone_id: 8 },
    { id: 9, nom: "Khadija", prenom: "Samira", telephone: "0690123456", disponibilite: "Occupé", vehicule: "Moto", zone_id: 9 },
    { id: 10, nom: "Mohamed", prenom: "Ali", telephone: "0601234567", disponibilite: "Disponible", vehicule: "Voiture", zone_id: 10 }
];

let clients = [
    { id: 1, nom: "Yassine", prenom: "Belkacem", telephone: "0611223344", email: "yassine@gmail.com", adresse: "Casablanca" },
    { id: 2, nom: "Amina", prenom: "Elhajji", telephone: "0622334455", email: "amina@gmail.com", adresse: "Rabat" },
    { id: 3, nom: "Omar", prenom: "Saidi", telephone: "0633445566", email: "omar@gmail.com", adresse: "Marrakech" },
    { id: 4, nom: "Karim", prenom: "Bouzidi", telephone: "0644556677", email: "karim@gmail.com", adresse: "Fès" },
    { id: 5, nom: "Salma", prenom: "Bensouda", telephone: "0655667788", email: "salma@gmail.com", adresse: "Tanger" },
    { id: 6, nom: "Nabil", prenom: "Haddadi", telephone: "0666778899", email: "nabil@gmail.com", adresse: "Agadir" },
    { id: 7, nom: "Fatima", prenom: "Zahra", telephone: "0677889900", email: "fatima@gmail.com", adresse: "Oujda" },
    { id: 8, nom: "Rachid", prenom: "Benali", telephone: "0688990011", email: "rachid@gmail.com", adresse: "Kenitra" },
    { id: 9, nom: "Laila", prenom: "Mouline", telephone: "0699001122", email: "laila@gmail.com", adresse: "Tetouan" },
    { id: 10, nom: "Samir", prenom: "Fakhreddine", telephone: "0600112233", email: "samir@gmail.com", adresse: "El Jadida" }
];

let produits = [
    { id: 1, nom: "Téléphone", description: "Smartphone Android", prix: 500, stock: 50, categorie: "Électronique" },
    { id: 2, nom: "Ordinateur", description: "Laptop professionnel", prix: 1000, stock: 30, categorie: "Électronique" },
    { id: 3, nom: "Tablette", description: "Tablette tactile", prix: 300, stock: 40, categorie: "Électronique" },
    { id: 4, nom: "Casque", description: "Casque Bluetooth", prix: 100, stock: 70, categorie: "Accessoires" },
    { id: 5, nom: "Clavier", description: "Clavier sans fil", prix: 50, stock: 100, categorie: "Accessoires" },
    { id: 6, nom: "Souris", description: "Souris optique", prix: 30, stock: 120, categorie: "Accessoires" },
    { id: 7, nom: "Imprimante", description: "Imprimante laser", prix: 200, stock: 20, categorie: "Bureau" },
    { id: 8, nom: "Scanner", description: "Scanner de documents", prix: 150, stock: 15, categorie: "Bureau" },
    { id: 9, nom: "Télévision", description: "Téléviseur LED", prix: 800, stock: 10, categorie: "Électronique" },
    { id: 10, nom: "Appareil photo", description: "Appareil photo numérique", prix: 600, stock: 25, categorie: "Électronique" }
];

let commandes = [
    { id: 101, client_id: 1, livreur_id: 1, produits: [{ nom: "Téléphone", quantite: 1, prix: 500 }], statut: "En cours", date_creation: "2024-12-20" },
    { id: 102, client_id: 2, livreur_id: 2, produits: [{ nom: "Ordinateur", quantite: 1, prix: 1000 }], statut: "Livrée", date_creation: "2024-12-21" },
    { id: 103, client_id: 3, livreur_id: 3, produits: [{ nom: "Tablette", quantite: 2, prix: 300 }], statut: "En cours", date_creation: "2024-12-22" },
    { id: 104, client_id: 4, livreur_id: 4, produits: [{ nom: "Casque", quantite: 1, prix: 100 }], statut: "Annulée", date_creation: "2024-12-23" },
    { id: 105, client_id: 5, livreur_id: 5, produits: [{ nom: "Clavier", quantite: 1, prix: 50 }], statut: "En cours", date_creation: "2024-12-24" },
    { id: 106, client_id: 6, livreur_id: 6, produits: [{ nom: "Souris", quantite: 1, prix: 30 }], statut: "Livrée", date_creation: "2024-12-25" },
    { id: 107, client_id: 7, livreur_id: 7, produits: [{ nom: "Imprimante", quantite: 1, prix: 200 }], statut: "En cours", date_creation: "2024-12-26" },
    { id: 108, client_id: 8, livreur_id: 8, produits: [{ nom: "Scanner", quantite: 1, prix: 150 }], statut: "Annulée", date_creation: "2024-12-27" },
    { id: 109, client_id: 9, livreur_id: 9, produits: [{ nom: "Télévision", quantite: 1, prix: 800 }], statut: "En cours", date_creation: "2024-12-28" },
    { id: 110, client_id: 10, livreur_id: 10, produits: [{ nom: "Appareil photo", quantite: 1, prix: 600 }], statut: "Livrée", date_creation: "2024-12-29" }
];

let zones = [
    { id: 1, nom: "Maarif", ville: "Casablanca", code: "CAS", livreurs_disponibles: 5 },
    { id: 2, nom: "Agdal", ville: "Rabat", code: "RAB", livreurs_disponibles: 4 },
    { id: 3, nom: "Sidi Bernoussi", ville: "Casablanca", code: "CAS", livreurs_disponibles: 3 },
    { id: 4, nom: "Hay Riad", ville: "Rabat", code: "RAB", livreurs_disponibles: 2 },
    { id: 5, nom: "Ain Sebaa", ville: "Casablanca", code: "CAS", livreurs_disponibles: 6 },
    { id: 6, nom: "Yacoub El Mansour", ville: "Rabat", code: "RAB", livreurs_disponibles: 7 },
    { id: 7, nom: "Oulfa", ville: "Casablanca", code: "CAS", livreurs_disponibles: 8 },
    { id: 8, nom: "Hassan", ville: "Rabat", code: "RAB", livreurs_disponibles: 9 },
    { id: 9, nom: "Anfa", ville: "Casablanca", code: "CAS", livreurs_disponibles: 10 },
    { id: 10, nom: "Souissi", ville: "Rabat", code: "RAB", livreurs_disponibles: 1 }
];

// Routes API
app.get('/livreurs', (req, res) => res.json(livreurs));
app.get('/clients', (req, res) => res.json(clients));
app.get('/produits', (req, res) => res.json(produits));
app.get('/commandes', (req, res) => res.json(commandes));
app.get('/zones', (req, res) => res.json(zones));

app.post('/livreurs', (req, res) => {
    const livreur = req.body;
    livreur.id = livreurs.length + 1;
    livreurs.push(livreur);
    res.status(201).json(livreur);
});

app.post('/clients', (req, res) => {
    const client = req.body;
    client.id = clients.length + 1;
    clients.push(client);
    res.status(201).json(client);
});

app.post('/produits', (req, res) => {
    const produit = req.body;
    produit.id = produits.length + 1;
    produits.push(produit);
    res.status(201).json(produit);
});

app.post('/commandes', (req, res) => {
    const commande = req.body;
    commande.id = commandes.length + 1;
    commandes.push(commande);
    res.status(201).json(commande);
});

app.post('/zones', (req, res) => {
    const zone = req.body;
    zone.id = zones.length + 1;
    zones.push(zone);
    res.status(201).json(zone);
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));