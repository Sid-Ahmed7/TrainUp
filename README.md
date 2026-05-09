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

```shell
chmod +x ./*.sh
```

3. Créez un fichier .env.local

```shell
DB_HOST=DB_HOST
DB_PORT=DB_PORT
DB_USERNAME=DB_USERNAME
DB_PASSWORD=DB_PASSWORD
DB_NAME=DB_NAME
PORT=PORT
JWT_SECRET=JWT_SECRET
JWT_SECRET_REFRESH=JWT_SECRET_REFRESH
JWT_EXPIRATION=3600
JWT_EXPIRATION_REFRESH=10800
```

L'expiration du bearer et du jwt est en seconde

4. Compiler et Démarrer le serveur

```shell
npm run build && npm start
```

```SQL DELETE
DO $$
DECLARE
    r RECORD;
BEGIN
    -- Supprimer toutes les tables du schéma public
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS "' || r.tablename || '" CASCADE;';
    END LOOP;
END
$$;
```
