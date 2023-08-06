#  _train - API Backend pour la Gestion de Réservation de Trains en Ligne

Bienvenue dans le projet _train ! Ce projet est une API Backend développée avec Node.js, Express.js, Prisma et utilise SQLite comme base de données. Il permet de gérer les réservations de trains en ligne 

## Installation

Suivez ces étapes pour installer et exécuter le projet localement :

1. Clonez le dépôt en utilisant la commande suivante :

```bash
git clone https://github.com/J2d6/_train.g

2.Accédez au répertoire du projet :

```bash
cd _train

3.Installez les dépendances nécessaires en utilisant npm :

```bash
npm install

4.Appliquez les migrations de la base de données avec Prisma :

```bash
npx prisma migrate dev --name="nom_de_la_migration"

5.Générez le client Prisma pour interagir avec la base de données :

```bash
npx prisma generate

6.Démarrez le serveur :

```bash
npm start

Le serveur API backend sera maintenant en cours d'exécution sur http://localhost:3000.



##À propos du projet

Le projet _train est une API Backend conçue pour une application écolière de gestion de réservation de trains en ligne. Il offre une interface pour gérer les réservations, les trains, les itinéraires et les utilisateurs, tout en utilisant une base de données SQLite pour stocker les données.

##Technologies utilisées

Ce projet utilise les technologies suivantes :

Node.js : Environnement d'exécution JavaScript côté serveur.
Express.js : Framework Web pour Node.js, facilitant la création d'API.
Prisma : ORM (Object-Relational Mapping) pour interagir avec la base de données.
SQLite : Système de gestion de base de données relationnelles, utilisé pour stocker les données du projet.
N'hésitez pas à contribuer au projet en apportant vos améliorations ou en signalant des problèmes. Nous sommes ravis de recevoir vos retours et contributions !

Happy coding! 😊

