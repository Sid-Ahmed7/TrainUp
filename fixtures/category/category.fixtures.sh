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

# URLs
register_url="http://localhost:3000/api/auth/register"
login_url="http://localhost:3000/api/auth/login"

# Création Admin
curl -s -X POST -H "Content-Type: application/json" -d "{\"name\":\"$ADMIN_NAME\",\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\",\"role\":\"SUPER_ADMIN\"}" "$register_url"
echo
# Création User
curl -s -X POST -H "Content-Type: application/json" -d "{\"name\":\"$USER_NAME\",\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASSWORD\",\"role\":\"USER\"}" "$register_url"
echo

# Login Admin
ADMIN_TOKEN=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" "$login_url" | grep -o '"token":"[^"]*' | cut -d':' -f2 | tr -d '"')
if [ -z "$ADMIN_TOKEN" ]; then
    echo "Impossible de récupérer le token admin."
    exit 1
fi

# Login User
USER_TOKEN=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASSWORD\"}" "$login_url" | grep -o '"token":"[^"]*' | cut -d':' -f2 | tr -d '"')
if [ -z "$USER_TOKEN" ]; then
    echo "Impossible de récupérer le token user."
    exit 1
fi

echo "Admin token: $ADMIN_TOKEN"
echo "User token: $USER_TOKEN"

# Exemple d'appel protégé avec le token admin (catégories)
categories=(
  '{"name": "Musculation"}'
  '{"name": "Cardio"}'
  '{"name": "Yoga"}'
  '{"name": "Pilates"}'
  '{"name": "CrossFit"}'
  '{"name": "HIIT"}'
  '{"name": "Stretching"}'
  '{"name": "Cyclisme"}'
  '{"name": "Natation"}'
  '{"name": "Course à pied"}'
)

url="http://localhost:3000/api/categorie/new"

for category in "${categories[@]}"; do
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" -d "$category" "$url"
  echo
done