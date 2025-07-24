#!/bin/bash
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

# Fixtures pour les rewards
rewards=(
  '{"name": "Bonus Collectionneur", "description": "500 points bonus pour avoir accumule 500 points de badges", "rewardType": "points", "rewardValue": "500 points bonus", "ruleType": "total_points", "ruleValue": 1300, "isActive": true}'
  '{"name": "Premier Defi", "description": "Badge pour avoir termine son premier defi", "rewardType": "badge", "rewardValue": "Starter", "ruleType": "challenges_completed", "ruleValue": 1, "isActive": true}'
  '{"name": "Entrainement Intensif", "description": "Bonus pour avoir cumule 2000 minutes d entrainement", "rewardType": "points", "rewardValue": "200 points bonus", "ruleType": "training_minutes", "ruleValue": 2000, "isActive": true}'
)

url="http://localhost:3000/api/reward/new"

for reward in "${rewards[@]}"; do
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" -d "$reward" "$url"
  echo
done