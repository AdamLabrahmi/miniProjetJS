const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Données simulées
let livreurs = [
    { id: 1, nom: "Jean Dupont", telephone: "0612345678", zone: "Paris", statut: "Actif" }
];
let clients = [
    { id: 1, nom: "Alice Martin", adresse: "10 rue des Lilas, Paris", telephone: "0654321987", email: "alice@example.com" }
];
let commandes = [
    { id: 101, client_id: 1, livreur_id: 1, produits: [{ nom: "Téléphone", quantite: 1, prix: 500 }], statut: "En cours", date_creation: "2024-12-20" }
];

// Routes API
app.get('/livreurs', (req, res) => res.json(livreurs));
app.get('/clients', (req, res) => res.json(clients));
app.get('/commandes', (req, res) => res.json(commandes));

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

app.post('/commandes', (req, res) => {
    const commande = req.body;
    commande.id = commandes.length + 1;
    commandes.push(commande);
    res.status(201).json(commande);
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
