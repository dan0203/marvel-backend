## Présentation du projet

Ce projet est un backend Node.js / Express permettant d'exposer une API autour de l'univers Marvel. Il sert d'intermédiaire entre un client frontend et une API externe, en proposant des routes dédiées à la récupération de personnages et de comics.

L'objectif du projet est de construire une API claire, structurée et maintenable, avec une attention particulière portée à la validation des données, à la gestion des erreurs et à la séparation des responsabilités dans le code.

## Fonctionnalités principales

L'API permet notamment de :

- récupérer la liste des personnages
- récupérer un personnage par son identifiant
- récupérer la liste des comics
- récupérer les comics associés à un personnage
- récupérer un comic par son identifiant

## Choix techniques

Le projet repose sur :

- `Node.js` pour l'environnement d'exécution
- `Express` pour la création des routes et la gestion du serveur
- `Axios` pour communiquer avec l'API externe
- `Mongoose` uniquement pour valider le format des `ObjectId`

## Architecture du projet

L'architecture a été pensée pour séparer les responsabilités en plusieurs couches :

### Routes

Les fichiers de routes définissent les endpoints disponibles et associent chaque URL à une action précise du contrôleur.

Exemple :
- `GET /characters`
- `GET /character/:characterId`
- `GET /comics`
- `GET /comic/:comicId`

### Controllers

Les contrôleurs reçoivent la requête HTTP, récupèrent les paramètres utiles, appellent les services, puis renvoient la réponse au client. Leur rôle est de rester léger et de ne pas contenir la logique métier.

### Services

Les services regroupent la logique métier du projet. Ils effectuent :

- la validation des paramètres reçus
- les appels à l'API externe via Axios
- certaines vérifications complémentaires sur les données retournées

Cette organisation permet de garder un code plus lisible, plus réutilisable et plus facile à faire évoluer.

### Utilitaires

Un utilitaire dédié permet de créer des erreurs personnalisées avec un statut HTTP et un message clair, afin d'uniformiser les erreurs métier dans toute l'application.

## Gestion des erreurs

Un middleware global de gestion d'erreurs est utilisé dans `index.js`. Il permet de centraliser le traitement des erreurs et d'éviter de dupliquer la même logique dans chaque route.

Le middleware distingue plusieurs cas :

- les erreurs métier générées par l'application
- les erreurs HTTP renvoyées par l'API externe
- les erreurs réseau
- les erreurs internes non prévues

Ce choix permet d'avoir des réponses plus cohérentes côté client et un code plus propre côté serveur.

## Note sur le comportement de l'API source

Une particularité observée dans ce projet concerne le comportement de l'API source lorsqu'un élément n'est pas trouvé.

Dans le cas des personnages et des comics, le comportement n'est pas totalement homogène :
- certains endpoints semblent renvoyer une réponse exploitable mais sans donnée attendue
- d'autres renvoient directement une erreur HTTP interceptée par Axios

Cette différence a un impact sur la gestion des erreurs côté backend. Selon l'endpoint interrogé, l'absence d'un élément peut donc être détectée :
- soit par une vérification explicite sur les données retournées
- soit par l'erreur HTTP remontée automatiquement par Axios

L'incohérence ne provient donc pas uniquement du code du projet, mais aussi du comportement de l'API externe, que le backend doit prendre en compte.

## Validation des données

Avant d'interroger l'API externe, certaines données sont validées côté serveur, notamment les identifiants passés dans l'URL.

Les contrôles portent par exemple sur :

- la présence obligatoire d'un identifiant
- le fait que cet identifiant ne soit pas une chaîne vide
- la validité de son format

Cette étape permet de détecter rapidement les erreurs de requête et d'éviter des appels inutiles à l'API distante.

## Objectifs de conception

Les principaux objectifs de ce projet étaient :

- construire une API REST simple et compréhensible
- adopter une structure de code claire dès le début
- rendre la gestion des erreurs plus robuste
- faciliter la maintenance et l'évolution du projet

## Améliorations possibles

Plusieurs pistes d'amélioration peuvent être envisagées pour la suite :

- ajouter des tests automatisés
- extraire davantage la logique de validation dans des modules dédiés
- centraliser les appels à l'API externe dans un client dédié
- enrichir la documentation des routes
