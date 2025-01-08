# Livorix - Tableau de Bord de Gestion de Livraison

## Description

Livorix est une application web de gestion de livraison conçue pour simplifier la gestion des livreurs, clients, produits, commandes et zones. L'application offre une interface utilisateur moderne et intuitive, construite avec **HTML**, **CSS** (utilisant **Tailwind CSS**), **JavaScript**, et des icônes de **Font Awesome**.

Ce projet est idéal pour les entreprises de livraison qui souhaitent centraliser et optimiser leurs opérations quotidiennes.

---

## Fonctionnalités

- **Gestion des données** :
  - Ajout, consultation, modification et suppression des livreurs, clients, produits, commandes et zones.
- **Affichage des listes** :
  - Tableaux interactifs pour visualiser les données.
- **Statistiques** :
  - Tableaux de bord avec des graphiques et des indicateurs clés.
- **Exportation des données** :
  - Téléchargement des données au format Excel.
- **Interface utilisateur moderne** :
  - Conception responsive et facile à utiliser.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants :

1. **Serveur web local** : Par exemple, [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) pour Visual Studio Code.
2. **Backend API** : Un serveur backend pour fournir les données (par exemple, un serveur Node.js avec Express).
3. **Navigateur web moderne** : Chrome, Firefox, Edge, etc.

---

## Installation

1. Clonez le dépôt sur votre machine locale :

git clone https://github.com/AdamLabrahmi/miniProjetJS.git

Ouvrez le projet dans votre éditeur de code préféré (par exemple, Visual Studio Code).

Assurez-vous que le serveur backend est en cours d'exécution et accessible à partir de l'URL configurée dans script.js.

Ouvrez le fichier dashboard.html dans votre navigateur en utilisant un serveur web local (par exemple, avec l'extension Live Server de Visual Studio Code).

## Utilisation
# Navigation
Tableau de bord (dashboard.html) :

Accédez à toutes les fonctionnalités principales via le menu de navigation.

Listes (ChoisieListe.html) :

Affichez les listes de livreurs, clients, produits, commandes et zones.

Ajout :

Ajoutez de nouveaux livreurs, clients, produits, commandes et zones via les pages dédiées (ajout.html).

Modification :

Modifiez les données existantes via les pages de modification (modification.html).

Suppression :

Supprimez des données via les pages de suppression (suppression.html).

Statistiques (Statistique.html) :

Consultez les statistiques et les indicateurs clés.

Graphiques (Graphe.html) :

Visualisez les données sous forme de graphiques.

Exportation :

Téléchargez les données au format Excel.

## Structure du projet

├── .vscode/                         # Configuration pour Visual Studio Code
│   ├── settings.json                # Paramètres de l'éditeur
├── css/                             # Dossier pour les fichiers CSS
│   ├── dashboard.css                # Styles pour le tableau de bord
│   ├── pageAcc.css                  # Styles pour la page d'accueil
│   ├── login.css                    # Styles pour la page de connexion
├── html/                            # Dossier pour les fichiers HTML
│   ├── clientss/                    # Dossier pour les pages des clients
│   │   ├── ajout.html               # Page pour ajouter un client
│   │   ├── modification.html        # Page pour modifier un client
│   │   ├── consulter.html           # Page pour consulter un client
│   │   └── tabC.html                # Tableau des clients
│   ├── commandes/                   # Dossier pour les pages des commandes
│   │   ├── ajout.html               # Page pour ajouter une commande
│   │   ├── modification.html        # Page pour modifier une commande
│   │   ├── consulter.html           # Page pour consulter une commande
│   │   └── tabCom.html              # Tableau des commandes
│   ├── livreurs/                    # Dossier pour les pages des livreurs
│   │   ├── ajout.html               # Page pour ajouter un livreur
│   │   ├── modification.html        # Page pour modifier un livreur
│   │   └── tabL.html                # Tableau des livreurs
│   ├── produits/                    # Dossier pour les pages des produits
│   │   ├── ajout.html               # Page pour ajouter un produit
│   │   ├── modification.html        # Page pour modifier un produit
│   │   └── tabP.html                # Tableau des produits
│   ├── zones/                       # Dossier pour les pages des zones
│   │   ├── ajout.html               # Page pour ajouter une zone
│   │   ├── modification.html        # Page pour modifier une zone
│   │   └── tabZ.html                # Tableau des zones
│   ├── ChoisieList.html             # Page pour choisir une liste
│   ├── dashboard.html               # Page principale du tableau de bord
│   ├── Graphe.html                  # Page pour afficher les graphiques
│   ├── index.html                   # Page d'accueil
│   ├── Liste.html                   # Page pour afficher les listes
│   ├── pageAcc.html                 # Page d'accueil alternative
│   ├── Statistique.html             # Page pour afficher les statistiques
├── imgs/                            # Dossier pour les images
│   ├── logo.png                     # Logo de l'application
├── js/                              # Dossier pour les fichiers JavaScript
│   ├── clientsjs/                   # Dossier pour les scripts des clients
│   │   ├── addclients.js            # Script pour ajouter un client
│   │   ├── modifclient.js          # Script pour modifier un client
│   │   └── clients.js               # Script pour le tableau des clients
│   │   └── consulter.js               # Script pour consulter des clients
│   ├── commandesjs/                 # Dossier pour les scripts des commandes
│   │   ├── addcommande.js                 # Script pour ajouter une commande
│   │   ├── modifcommande.js          # Script pour modifier une commande
│   │   ├── consulter.js          # Script pour consulter une commande
│   │   └── commandes.js               # Script pour le tableau des commandes
│   ├── livreursjs/                  # Dossier pour les scripts des livreurs
│   │   ├── addlivreur.js                 # Script pour ajouter un livreur
│   │   ├── modiflivreur.js          # Script pour modifier un livreur
│   │   └── livreurs.js               # Script pour le tableau des livreurs
│   ├── produitsjs/                  # Dossier pour les scripts des produits
│   │   ├── addproduit.js                 # Script pour ajouter un produit
│   │   ├── modifproduit.js          # Script pour modifier un produit
│   │   └── produits.js               # Script pour le tableau des produits
│   ├── zonesjs/                     # Dossier pour les scripts des zones
│   │   ├── addzone.js                 # Script pour ajouter une zone
│   │   ├── modifzone.js          # Script pour modifier une zone
│   │   └── zones.js               # Script pour le tableau des zones
│   ├── dashboard.js                  # Script pour le tableau de bord
│   ├── graphe.js                     # Script pour les graphiques
│   ├── login.js                      # Script pour la page de connexion
│   ├── pageAcc.js                   # Script pour la page d'accueil alternative
│   ├── script.js                     # Script principal de l'application
│   ├── Statistique.js                # Script pour les statistiques
├── lang/                             # Dossier pour les fichiers de langue
│   ├── lang-ar.json                      # Fichier de langue français
│   ├── lang-en.json                      # Fichier de langue français
│   ├── lang-fr.json                      # Fichier de langue anglais
├── myapi/                           # Dossier pour l'API personnalisée
    ├── node_modules/                    # Dossier pour les modules Node.js
    ├── package-lock.json                # Fichier de verrouillage des dépendances
    ├── package.json                     # Fichier de configuration du projet
    └── server.js                        # Fichier principal du serveur Node.js




## Technologies 

Tailwind CSS pour le design.
Font Awesome pour les icônes.
Node.js et Express pour le backend.

## Contact
Pour toute question ou suggestion, n'hésitez pas à me contacter à l'adresse suivante : adamlabrahmi8@gmail.com

