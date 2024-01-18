# Projet Fisher Fans

Ce document fournit une documentation de base pour le projet Fisher Fans, une application basée sur Express.js. Assurez-vous de mettre à jour cette documentation au fur et à mesure que le projet évolue.

## Configuration du Projet

- **Nom du Projet**: Fisher Fans
- **Description**: Application web pour les passionnés de pêche.
- **Version**: 1.0.0

## Prérequis

Avant de commencer à travailler sur le projet, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (géré par défaut avec Node.js)

## Installation

1. Clonez le dépôt du projet :

    ```bash
    git clone https://github.com/votre-utilisateur/FisherFans.git
    ```

2. Accédez au répertoire du projet :

    ```bash
    cd FisherFans
    ```

3. Installez les dépendances :

    ```bash
    npm install
    ```

## Configuration

1. Dupliquez le fichier `.env.example` et renommez-le en `.env`.
2. Configurez les variables d'environnement dans le fichier `.env` selon vos besoins.

## Lancement de l'Application

Pour lancer l'application, utilisez la commande suivante :

```bash
npm run dev

DOCUMENTATION SWAGGER: https://localhost:3000/api-docs

## pour run les test ##
 npm test tests/reservationsController.test.js && npm test tests/authController.test.js && npm test tests/boatController.test.js && npm test tests/userController.test.js