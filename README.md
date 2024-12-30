# Livorix - Tableau de Bord

## Description

Livorix est une application Gestion d’un service de livraison pour la gestion des livreurs, clients, produits, commandes et zones. Cette application utilise HTML, CSS (avec Tailwind CSS), JavaScript et Font Awesome pour créer une interface utilisateur interactive et moderne.

## Fonctionnalités

- Affichage des listes de livreurs, clients, produits, commandes et zones.
- Ajout, consultation, modification et suppression des données.
- Téléchargement des données au format Excel.
- Affichage des statistiques et graphiques.

## Prérequis

- Un serveur web local (par exemple, [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) pour Visual Studio Code).
- Un backend API pour fournir les données (par exemple, un serveur Node.js avec Express).

## Installation

1. Clonez le dépôt sur votre machine locale :

    ```bash
    git clone https://github.com/votre-utilisateur/Livorix-dashboard.git
    ```

2. Ouvrez le projet dans votre éditeur de code préféré (par exemple, Visual Studio Code).

3. Assurez-vous que le serveur backend est en cours d'exécution et accessible à partir de l'URL configurée dans `script.js`.

## Utilisation

1. Ouvrez le fichier [dashboard.html](http://_vscodecontentref_/0) dans votre navigateur web en utilisant un serveur web local (par exemple, en utilisant l'extension Live Server de Visual Studio Code).

2. Utilisez le menu de navigation pour accéder aux différentes sections de l'application :
    - Liste : Affiche les listes de livreurs, clients, produits, commandes et zones.
    - Ajout : Permet d'ajouter de nouveaux livreurs, clients, produits, commandes et zones.
    - Consulter : Permet de consulter les détails des livreurs, clients, produits, commandes et zones.
    - Supprimer : Permet de supprimer des livreurs, clients, produits, commandes et zones.
    - Statistique : Affiche les statistiques de l'application.
    - Telecharger : Permet de télécharger les données au format Excel.
    - Graphe : Affiche des graphiques basés sur les données.

## Structure du Projet

- [html](http://_vscodecontentref_/1)
  - [dashboard.html](http://_vscodecontentref_/2) : Page principale du tableau de bord.
  - `Liste.html` : Page affichant les listes de données.
- [css](http://_vscodecontentref_/3)
  - `style.css` : Fichier CSS personnalisé (si nécessaire).
- [js](http://_vscodecontentref_/4)
  - `script.js` : Fichier JavaScript contenant la logique pour récupérer et afficher les données.
  - `dashboard.js` : Fichier JavaScript contenant la logique spécifique au tableau de bord.
- `README.md` : Ce fichier.

## Contribuer

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet, veuillez suivre les étapes suivantes :

1. Fork le dépôt.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalité`).
3. Commitez vos modifications (`git commit -m 'Ajouter ma fonctionnalité'`).
4. Poussez votre branche (`git push origin feature/ma-fonctionnalité`).
5. Ouvrez une Pull Request.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
