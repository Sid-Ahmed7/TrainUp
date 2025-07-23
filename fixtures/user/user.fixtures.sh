#!/bin/bash

# Charger les variables d'environnement depuis le .env à la racine du projet
ENV_PATH="$(dirname "$0")/../../.env"
if [ -f "$ENV_PATH" ]; then
    source "$ENV_PATH"
else
    echo "Le fichier .env est introuvable à $ENV_PATH."
    exit 1
fi

# Vérifier que les variables sont bien définies
if [ -z "$ADMIN_NAME" ] || [ -z "$ADMIN_EMAIL" ] || [ -z "$ADMIN_PASSWORD" ]; then
    echo "ADMIN_NAME, ADMIN_EMAIL ou ADMIN_PASSWORD manquant dans .env"
    exit 1
fi
if [ -z "$USER_NAME" ] || [ -z "$USER_EMAIL" ] || [ -z "$USER_PASSWORD" ]; then
    echo "USER_NAME, USER_EMAIL ou USER_PASSWORD manquant dans .env"
    exit 1
fi

register_url="http://localhost:3000/api/auth/register"

# Création Admin
curl -s -X POST -H "Content-Type: application/json" \
    -d "{\"name\":\"$ADMIN_NAME\",\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\",\"role\":\"SUPER_ADMIN\"}" \
    "$register_url"
echo

# Création User
curl -s -X POST -H "Content-Type: application/json" \
    -d "{\"name\":\"$USER_NAME\",\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASSWORD\",\"role\":\"USER\"}" \
    "$register_url"
echo