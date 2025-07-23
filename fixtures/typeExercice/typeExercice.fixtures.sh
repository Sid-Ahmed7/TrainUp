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

url="http://localhost:3000/api/exercice/new"

difficultyLevels=("beginner" "intermediate" "advanced" "expert")
environments=("indoor" "outdoor" "mixed")

for i in {1..5}; do
  diff=${difficultyLevels[$(( (i-1) % 4 ))]}
  env=${environments[$(( (i-1) % 3 ))]}
  categoryId=$(( ( RANDOM % 10 )  + 1 ))
  audienceId=$(( ( RANDOM % 7 )  + 1 ))
  payload=$(cat <<EOF
{
  "name": "Exercice $i",
  "description": "Description de l'exercice $i",
  "targetMuscles": ["Muscle $i"],
  "categoryId": $categoryId,
  "difficultyLevel": "$diff",
  "environment": "$env",
  "instructions": "Instructions pour exercice $i",
  "tips": "Conseils pour exercice $i",
  "imageUrl": "https://exemple.com/exercice$i.jpg",
  "audienceIds": [$audienceId],
  "equipments": []
}
EOF
)
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" --data-binary "$payload" "$url"
  echo
done