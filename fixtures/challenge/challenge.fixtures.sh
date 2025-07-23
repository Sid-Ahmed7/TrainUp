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

if [ -z "$USER_NAME" ] || [ -z "$USER_EMAIL" ] || [ -z "$USER_PASSWORD" ]; then
    echo "USER_NAME, USER_EMAIL ou USER_PASSWORD manquant dans .env"
    exit 1
fi

login_url="http://localhost:3000/api/auth/login"

# Login User
USER_TOKEN=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASSWORD\"}" "$login_url" | grep -o '"token":"[^"]*' | cut -d':' -f2 | tr -d '"')
if [ -z "$USER_TOKEN" ]; then
    echo "Impossible de recuperer le token user."
    exit 1
fi

url="http://localhost:3000/api/challenge/new"

# Remplace ces valeurs par des IDs valides de ta base
ex1=1
ex2=2
ex3=3
user1="user-id-uuid"
user2="user2-id-uuid"

challenges=(
'{
  "title": "Defi Cardio 30min",
  "description": "Un challenge pour ameliorer ton endurance cardio.",
  "objectives": "Tenir 30 minutes de cardio sans interruption.",
  "durationMinutes": 30,
  "difficulty": "beginner",
  "startDate": "2024-08-01T09:00:00Z",
  "endDate": "2024-08-31T23:59:59Z",
  "targetCalories": 300,
  "requiredSessions": 8,
  "exercises": ['$ex1', '$ex2'],
  "participants": ["'$user1'", "'$user2'"],
  "creatorId": "'$creatorId'"
}'
'{
  "title": "Challenge Muscu Express",
  "description": "Un defi pour progresser en musculation.",
  "objectives": "Augmenter la charge sur 3 exercices cles.",
  "durationMinutes": 45,
  "difficulty": "intermediate",
  "startDate": "2024-09-01T09:00:00Z",
  "endDate": "2024-09-30T23:59:59Z",
  "targetCalories": 500,
  "requiredSessions": 12,
  "exercises": ['$ex2', '$ex3'],
  "participants": ["'$user1'"],
  "creatorId": "'$creatorId'"
}'
'{
  "title": "Defi HIIT Avance",
  "description": "Un challenge intense pour les sportifs confirmes.",
  "objectives": "Realiser 10 seances HIIT en 2 semaines.",
  "durationMinutes": 20,
  "difficulty": "advanced",
  "startDate": "2024-10-01T09:00:00Z",
  "endDate": "2024-10-15T23:59:59Z",
  "targetCalories": 400,
  "requiredSessions": 10,
  "exercises": ['$ex1', '$ex3'],
  "participants": [],
  "creatorId": "'$creatorId'"
}'
)

for challenge in "${challenges[@]}"; do
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" --data-binary "$challenge" "$url"
  echo
done