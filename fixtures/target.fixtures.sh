#!/bin/bash
export LANG="fr_FR.UTF-8"
export LC_ALL="fr_FR.UTF-8"

ENV_PATH="$(dirname "$0")/../.env"
if [ -f "$ENV_PATH" ]; then
    source "$ENV_PATH"
else
    echo "Le fichier .env est introuvable à $ENV_PATH."
    exit 1
fi

if [ -z "$ADMIN_NAME" ] || [ -z "$ADMIN_EMAIL" ] || [ -z "$ADMIN_PASSWORD" ]; then
    echo "ADMIN_NAME, ADMIN_EMAIL ou ADMIN_PASSWORD manquant dans .env"
    exit 1
fi

login_url="http://localhost:3000/api/auth/login"

# Login Admin
ADMIN_TOKEN=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" "$login_url" | grep -o '"token":"[^"]*' | cut -d':' -f2 | tr -d '"')
if [ -z "$ADMIN_TOKEN" ]; then
    echo "Impossible de récupérer le token admin."
    exit 1
fi

echo "Admin token: $ADMIN_TOKEN"
# Fixtures pour les targets
targets=(
  '{"name": "Jeune"}'
  '{"name": "Adulte"}'
  '{"name": "Senior"}'
  '{"name": "Enfant"}'
  '{"name": "Sportif"}'
  '{"name": "Debutant"}'
  '{"name": "Avance"}'
)

url="http://localhost:3000/api/target/new"

for target in "${targets[@]}"; do
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" --data-binary "$target" "$url"
  echo
done