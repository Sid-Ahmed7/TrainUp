# TrainUp

## Description

TrainUp est une application Node.js construite avec Express et TypeScript.  

---

## Prérequis

- Node.js 
- PostgreSQL installé et configuré
---

## Installation

1. Clonez ce dépôt

```shell
git clone <URL_DU_DEPOT>
cd trainup
```
2. Installez les dépendances

```shell
npm install
```

3. Générer deux secrets pour JWT et REFRESH_JWT

```shell
openssl rand -hex 32
```

3. Créez un fichier .env
```shell
DB_HOST=DB_HOST
DB_PORT=DB_PORT
DB_USERNAME=DB_USERNAME
DB_PASSWORD=DB_PASSWORD
DB_NAME=DB_NAME
PORT=PORT
JWT_SECRET=JWT_SECRET
JWT_SECRET_REFRESH=JWT_SECRET_REFRESH
```

4. Compiler et Démarrer le serveur
```shell
npm run build && npm start
```
