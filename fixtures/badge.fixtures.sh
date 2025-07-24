#!/bin/bash
ENV_PATH="$(dirname "$0")/../../.env"
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

# Fixtures pour les badges
badges=(
  '{"name": "Expert", "description": "Terminer 20 defis", "points": 950, "ruleType": "challenges_completed", "ruleValue": 20, "isActive": true}'
  '{"name": "Starter", "description": "Terminer 1 defi", "points": 50, "ruleType": "challenges_completed", "ruleValue": 1, "isActive": true}'
  '{"name": "Marathoner", "description": "Cumuler 1000 minutes d entrainement", "points": 500, "ruleType": "training_minutes", "ruleValue": 1000, "isActive": true}'
)

url="http://localhost:3000/api/badge/new"

for badge in "${badges[@]}"; do
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" -d "$badge" "$url"
  echo
done