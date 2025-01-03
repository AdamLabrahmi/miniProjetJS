const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

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
    { id: 1, nom: "Bourak", prenom: "Ali", telephone: "0693403054", email: "alibusinessbourak@gmail.com", adresse: "Casablanca" },
    { id: 2, nom: "Amina", prenom: "Elhajji", telephone: "0622334455", email: "amina@gmail.com", adresse: "Rabat" },
    { id: 3, nom: "Omar", prenom: "Saidi", telephone: "0633445566", email: "omar@gmail.com", adresse: "Rabat" },
    { id: 4, nom: "Karim", prenom: "Bouzidi", telephone: "0644556677", email: "karim@gmail.com", adresse: "Casablanca" },
    { id: 5, nom: "Salma", prenom: "Bensouda", telephone: "0655667788", email: "salma@gmail.com", adresse: "Rabat" },
    { id: 6, nom: "Nabil", prenom: "Haddadi", telephone: "0666778899", email: "nabil@gmail.com", adresse: "Rabat" },
    { id: 7, nom: "Fatima", prenom: "Zahra", telephone: "0677889900", email: "fatima@gmail.com", adresse: "Casablanca" },
    { id: 8, nom: "Rachid", prenom: "Benali", telephone: "0688990011", email: "rachid@gmail.com", adresse: "Casablanca" },
    { id: 9, nom: "Laila", prenom: "Mouline", telephone: "0699001122", email: "laila@gmail.com", adresse: "Casablanca" },
    { id: 10, nom: "Samir", prenom: "Fakhreddine", telephone: "0600112233", email: "samir@gmail.com", adresse: "Rabat" }
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
    { id: 1, client_id: 1, livreur_id: 1, produits: [{ nom: "Téléphone", quantite: 1, prix: 500 }], statut: "En cours", date_creation: "2024-12-20" },
    { id: 2, client_id: 2, livreur_id: 2, produits: [{ nom: "Ordinateur", quantite: 1, prix: 1000 }], statut: "Livrée", date_creation: "2024-12-21" },
    { id: 3, client_id: 3, livreur_id: 3, produits: [{ nom: "Tablette", quantite: 2, prix: 300 }], statut: "En cours", date_creation: "2024-12-22" },
    { id: 4, client_id: 4, livreur_id: 4, produits: [{ nom: "Casque", quantite: 1, prix: 100 }], statut: "Annulée", date_creation: "2024-12-23" },
    { id: 5, client_id: 5, livreur_id: 5, produits: [{ nom: "Clavier", quantite: 1, prix: 50 }], statut: "En cours", date_creation: "2024-12-24" },
    { id: 6, client_id: 6, livreur_id: 6, produits: [{ nom: "Souris", quantite: 1, prix: 30 }], statut: "Livrée", date_creation: "2024-12-25" },
    { id: 7, client_id: 7, livreur_id: 7, produits: [{ nom: "Imprimante", quantite: 1, prix: 200 }], statut: "En cours", date_creation: "2024-12-26" },
    { id: 8, client_id: 8, livreur_id: 8, produits: [{ nom: "Scanner", quantite: 1, prix: 150 }], statut: "Annulée", date_creation: "2024-12-27" },
    { id: 9, client_id: 9, livreur_id: 9, produits: [{ nom: "Télévision", quantite: 1, prix: 800 }], statut: "En cours", date_creation: "2024-12-28" },
    { id: 10, client_id: 10, livreur_id: 10, produits: [{ nom: "Appareil photo", quantite: 1, prix: 600 }], statut: "Livrée", date_creation: "2024-12-29" }
];

let zones = [
    { id: 1, nom: "Maarif", ville: "Casablanca", code: "CAS" },
    { id: 2, nom: "Agdal", ville: "Rabat", code: "RAB" },
    { id: 3, nom: "Sidi Bernoussi", ville: "Casablanca", code: "CAS" },
    { id: 4, nom: "Hay Riad", ville: "Rabat", code: "RAB" },
    { id: 5, nom: "Ain Sebaa", ville: "Casablanca", code: "CAS" },
    { id: 6, nom: "Yacoub El Mansour", ville: "Rabat", code: "RAB" },
    { id: 7, nom: "Oulfa", ville: "Casablanca", code: "CAS" },
    { id: 8, nom: "Hassan", ville: "Rabat", code: "RAB" },
    { id: 9, nom: "Anfa", ville: "Casablanca", code: "CAS" },
    { id: 10, nom: "Souissi", ville: "Rabat", code: "RAB" }
];

// Routes API
app.get('/livreurs', (req, res) => res.json(livreurs));
app.get('/clients', (req, res) => res.json(clients));
app.get('/produits', (req, res) => res.json(produits));
app.get('/commandes', (req, res) => res.json(commandes));
app.get('/zones', (req, res) => res.json(zones));


//Livreurs
// ===========
app.get('/livreurs/:id', (req, res) => {
    const livreurId = parseInt(req.params.id);
    const livreur = livreurs.find(l => l.id === livreurId);
    if (livreur) {
        res.json(livreur);
    } else {
        res.status(404).json({ message: 'Livreur non trouvé' });
    }
});

app.get('/zones/:id', (req, res) => {
    const zoneId = parseInt(req.params.id);
    const zone = zones.find(z => z.id === zoneId);
    if (zone) {
        res.json(zone);
    } else {
        res.status(404).json({ message: 'Zone non trouvée' });
    }
});

app.get('/zones', (req, res) => {
    res.json(zones);
});

app.get('/zones/id', (req, res) => {
    const zoneNom = req.query.nom;
    const zone = zones.find(z => z.nom.toLowerCase() === zoneNom.toLowerCase());
    if (zone) {
        res.json({ id: zone.id });
    } else {
        res.status(404).json({ message: 'Zone non trouvée' });
    }
});

// =================

app.post('/livreurs', (req, res) => {
    const livreur = req.body;
    livreur.id = livreurs.length + 1;
    livreurs.push(livreur);
    res.status(201).json(livreur);
});

app.post('/livreurs', (req, res) => {
    const nouveauLivreur = req.body;  // Livreur envoyé dans la requête
    nouveauLivreur.id = livreurs.length + 1; // Générez un nouvel ID
    livreurs.push(nouveauLivreur); // Ajoutez le Livreur à la liste
    res.status(201).json(nouveauLivreur); // Réponse avec le client ajouté
});


app.delete('/livreurs/:id', (req, res) => {
    const livreurId = parseInt(req.params.id);
    const livreurIndex = livreurs.findIndex(livreur => livreur.id === livreurId);
    if (livreurIndex !== -1) {
        livreurs.splice(livreurIndex, 1);
        res.status(200).json({ message: 'Livreur supprimé avec succès' });
    } else {
        res.status(404).json({ message: 'Livreur non trouvé' });
    }
});



//CLIENTS


// app.post('/clients', (req, res) => {
//     const client = req.body;
//     client.id = clients.length + 1;
//     clients.push(client);
//     res.status(201).json(client);
// });

app.post('/clients', (req, res) => {
    const nouveauClient = req.body;  // Client envoyé dans la requête
    nouveauClient.id = clients.length + 1; // Générez un nouvel ID
    clients.push(nouveauClient); // Ajoutez le client à la liste
    res.status(201).json(nouveauClient); // Réponse avec le client ajouté
});
// app.get('/clients', (req, res) => {
//     res.json(clients); // Send clients data as JSON
// });

app.get('/clients/:id', (req, res) => {
    const clientId = parseInt(req.params.id);
    const client = clients.find(c => c.id === clientId);
    if (client) {
        res.json(client);
    } else {
        res.status(404).json({ message: 'Client non trouvé' });
    }
});

app.put('/clients/:id', (req, res) => {
    const clientId = parseInt(req.params.id);
    const clientModifie = req.body;
    const client = clients.find(client => client.id === clientId);
    if (client) {
        client.nom = clientModifie.nom;
        client.prenom = clientModifie.prenom;
        client.telephone = clientModifie.telephone;
        client.email = clientModifie.email;
        client.adresse = clientModifie.adresse;
        res.status(200).json(client);
    }
    else {
        res.status(404).json({ message: 'Client non trouvé' });
    }
});


app.delete('/clients/:id', (req, res) => {
    const clientId = parseInt(req.params.id);
    const clientIndex = clients.findIndex(client => client.id === clientId);
    if (clientIndex !== -1) {
        clients.splice(clientIndex, 1);
        res.status(200).json({ message: 'Client supprimé avec succès' });
    } else {
        res.status(404).json({ message: 'Client non trouvé' });
    }
});

// Produits
app.post('/produits', (req, res) => {
    const produit = req.body;
    produit.id = produits.length + 1;
    produits.push(produit);
    res.status(201).json(produit);
});

app.get('/produits/:id', (req, res) => {
    const produitId = parseInt(req.params.id);
    const produit = produits.find(p => p.id === produitId);
    if (produit) {
        res.json(produit);
    } else {
        res.status(404).json({ message: 'Produit non trouvé' });
    }
});

app.put('/produits/:id', (req, res) => {
    const produitId = parseInt(req.params.id);
    const produitModifie = req.body;
    const produit = produits.find(produit => produit.id === produitId);
    if (produit) {
        produit.nom = produitModifie.nom;
        produit.description = produitModifie.description;
        produit.prix = produitModifie.prix;
        produit.stock = produitModifie.stock;
        produit.categorie = produitModifie.categorie;
        res.status(200).json(produit);
    } else {
        res.status(404).json({ message: 'Produit non trouvé' });
    }
});
app.post('/produits', (req, res) => {
    const nouveauProduit = req.body;  // Produit envoyé dans la requête
    nouveauProduit.id = produits.length + 1; // Générez un nouvel ID
    produits.push(nouveauProduit); // Ajoutez le produit à la liste
    res.status(201).json(nouveauProduit); // Réponse avec le produit ajouté
});

app.delete('/produits/:id', (req, res) => {
    const produitId = parseInt(req.params.id);
    const produitIndex = produits.findIndex(produit => produit.id === produitId);
    if (produitIndex !== -1) {
        produits.splice(produitIndex, 1);
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } else {
        res.status(404).json({ message: 'Produit non trouvé' });
    }
});

// Commandes
// app.get('/commandes', (req, res) => {
//     res.json(commandes);
// });

// app.post('/commandes', (req, res) => {
//     const commande = req.body;
//     commande.id = commandes.length + 1;
//     commandes.push(commande);
//     res.status(201).json(commande);
// });

// Commandes
app.get('/commandes', (req, res) => {
    res.json(commandes);
});

app.get('/commandes/:id', (req, res) => {
    const commandeId = parseInt(req.params.id);
    const commande = commandes.find(c => c.id === commandeId);
    if (commande) {
        res.json(commande);
    } else {
        res.status(404).json({ message: 'Commande non trouvée' });
    }
});

app.put('/commandes/:id', (req, res) => {
    const commandeId = parseInt(req.params.id);
    const commandeModifiee = req.body;
    const commande = commandes.find(c => c.id === commandeId);
    if (commande) {
        commande.client_nom = commandeModifiee.client_nom;
        commande.livreur_nom = commandeModifiee.livreur_nom;
        commande.produits = commandeModifiee.produits;
        commande.statut = commandeModifiee.statut;
        commande.date_creation = commandeModifiee.date_creation;
        res.status(200).json(commande);
    } else {
        res.status(404).json({ message: 'Commande non trouvée' });
    }
});

app.put('/commandes/:id', (req, res) => {
    const commandeId = parseInt(req.params.id);
    const commandeModifiee = req.body;
    const commande = commandes.find(c => c.id === commandeId);
    if (commande) {
        commande.client_id = commandeModifiee.client_id;
        commande.livreur_id = commandeModifiee.livreur_id;
        commande.produits = commandeModifiee.produits;
        commande.statut = commandeModifiee.statut;
        commande.date_creation = commandeModifiee.date_creation;
        res.status(200).json(commande);
    } else {
        res.status(404).json({ message: 'Commande non trouvée' });
    }
});

app.post('/commandes', (req, res) => {
    const commande = req.body;
    commande.id = commandes.length + 1;
    commandes.push(commande);
    res.status(201).json(commande);
});

// app.delete('/commandes/:id', (req, res) => {
//     const commandeId = parseInt(req.params.id);
//     const commandeIndex = commandes.findIndex(commande => commande.id === commandeId);
//     if (commandeIndex !== -1) {
//         commandes.splice(commandeIndex, 1);
//         res.status(200).json({ message: 'Commande supprimée avec succès' });
//     } else {
//         res.status(404).json({ message: 'Commande non trouvée' });
//     }
// });


app.delete('/commandes/:id', (req, res) => {
    const commandeId = parseInt(req.params.id);
    const commandeIndex = commandes.findIndex(commande => commande.id === commandeId);
    if (commandeIndex !== -1) {
        commandes.splice(commandeIndex, 1);
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } else {
        res.status(404).json({ message: 'Commande non trouvée' });
    }
});

// ZONES
app.post('/zones', (req, res) => {
    const zone = req.body;
    zone.id = zones.length + 1;
    zones.push(zone);
    res.status(201).json(zone);
});

app.post('/zones', (req, res) => {
    const nouvelleZone = req.body;  // Zone envoyée dans la requête
    nouvelleZone.id = zones.length + 1; // Générez un nouvel ID
    zones.push(nouvelleZone); // Ajoutez la zone à la liste
    res.status(201).json(nouvelleZone); // Réponse avec la zone ajoutée
});

app.delete('/zones/:id', (req, res) => {
    const zoneId = parseInt(req.params.id);
    const zoneIndex = zones.findIndex(zone => zone.id === zoneId);
    if (zoneIndex !== -1) {
        zones.splice(zoneIndex, 1);
        res.status(200).json({ message: 'Zone supprimée avec succès' });
    } else {
        res.status(404).json({ message: 'Zone non trouvée' });
    }
});


// Zone par ID
app.get('/zones/id', (req, res) => {
    const zoneNom = req.query.nom;
    const zone = zones.find(z => z.nom.toLowerCase() === zoneNom.toLowerCase());
    if (zone) {
        res.json({ id: zone.id });
    } else {
        res.status(404).json({ message: 'Zone non trouvée' });
    }
});

// Prix des produits
app.get('/produits/prix', (req, res) => {
    const produitNom = req.query.nom;
    const produit = produits.find(p => p.nom.toLowerCase() === produitNom.toLowerCase());
    if (produit) {
        res.json({ prix: produit.prix });
    } else {
        res.status(404).json({ message: 'Produit non trouvé' });
    }
});

app.get('/statistiques', (req, res) => {
    const statistiques = {
        utilisateurs: 100, // Exemple de données
        livreurs: 50,
        commandesLivrees: 200,
        commandesEnCours: 30,
        commandesAnnulees: 10,
        nombreZones: 15,
        nombreProduits: 120
    };
    res.json(statistiques);
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));