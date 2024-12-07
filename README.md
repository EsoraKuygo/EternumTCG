# Projet: Gestion des Cartes avec Next.js et TypeScript

## Introduction
Ce projet est une application web développée avec **Next.js** et **TypeScript**, utilisant **PostgreSQL** comme base de données. L'objectif principal est de permettre la gestion et l'affichage de cartes avec des fonctionnalités avancées telles que la récupération sécurisée des images etc.

### Technologies Utilisées
- **Next.js** (Framework React)
- **TypeScript** (Langage typé pour JavaScript)
- **PostgreSQL** (Base de données relationnelle)
- **Middleware personnalisé** pour sécuriser les images
- **API RESTful**

### Statut du Projet
Actuellement en développement.

---

## Installation

### Prérequis
Assurez-vous que les outils suivants sont installés sur votre machine :
- **Node.js** (v16+ recommandé)
- **npm** ou **yarn**
- **PostgreSQL** (v13+ recommandé)

### Étapes d'installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com//EsoraKuygo/EternumTCG.git
   ```
2. Accédez au dossier du projet :
   ```bash
   cd eternumtcg
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```
4. Configurez les variables d'environnement dans un fichier `.env.local` :
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/nom_de_la_base
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```
5. Lancez le projet en mode développement :
   ```bash
   npm run dev
   ```
6. Accédez à l'application via [http://localhost:3000](http://localhost:3000).

---

## Utilisation

### Navigation
- **Page principale** : Affiche une liste des cartes avec leurs informations principales.
- **Fonctionnalités** :
  - Chargement dynamique des cartes depuis une base de données.
  - Affichage sécurisé des images via des middlewares.

---

## API

### Routes principales
- `GET /api/cards` : Récupère toutes les cartes.
- `GET /api/images/:imageName` : Récupère une image de manière sécurisée.

### Exemple d'endpoint
#### `GET /api/cards`
**Description** : Retourne une liste des cartes avec leurs métadonnées.

**Réponse :**
```json
[
  {
    "id": 11,
    "name": "Luna, Aggressive Storyteller",
    "mana_cost": "2{B}{U}",
    "attack": 5,
    "defense": 3,
    "img": "src/img/LunaAggressiveStoryteller.png",
    "rarity_id": 2,
    "rules_text": "When Luna, Aggressive Storyteller enters the battlefield, look at the top three cards of your library..."
  }
]
```

---

## Arborescence du Projet
```
src/
├── app/
│   ├── api        
│   ├── page.tsx         // Page principale
├── img/          // Images des cartes
├── database/             // Gestion de la base de données
│   ├── entities
│   ├── repository
├── scripts/
```

---

## Contribution

1. Forkez le dépôt.
2. Créez une branche pour vos modifications :
   ```bash
   git checkout -b feature/ma-feature
   ```
3. Commitez vos changements :
   ```bash
   git commit -m "Ajout d'une nouvelle fonctionnalité"
   ```
4. Pushez vers votre branche :
   ```bash
   git push origin feature/ma-feature
   ```
5. Ouvrez une Pull Request.

---

