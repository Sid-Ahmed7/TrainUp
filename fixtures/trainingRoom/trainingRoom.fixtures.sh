#!/bin/bash

export LANG="en_US.UTF-8"
export LC_ALL="en_US.UTF-8"

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

url="http://localhost:3000/api/training-rooms/new"

for i in {1..3}; do
  capacity=$(( ( RANDOM % 30 ) + 10 ))
  exerciceId1=$(( ( RANDOM % 5 ) + 1 ))
  exerciceId2=$(( ( RANDOM % 5 ) + 1 ))
  equipmentId1=$(( ( RANDOM % 10 ) + 1 ))
  equipmentId2=$(( ( RANDOM % 10 ) + 1 ))
  payload=$(cat <<EOF
{
  "name": "Salle $i",
  "address": "Adresse $i, Ville",
  "description": "Salle d'entrainement numero $i",
  "capacity": $capacity,
  "equipment": ["$equipmentId1", "$equipmentId2"],
  "typeExerciceEquipments": [
    { "exerciceId": $exerciceId1, "equipmentId": $equipmentId1 },
    { "exerciceId": $exerciceId2 }
  ],
  "phone": "010203040$i",
  "email": "salle$i@example.com",
  "website": "https://salle$i.example.com"
}
EOF
)
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" --data-binary "$payload" "$url"
  echo
done