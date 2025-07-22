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

login_url="http://localhost:3000/api/auth/login"

# Login Admin
ADMIN_TOKEN=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" "$login_url" | grep -o '"token":"[^"]*' | cut -d':' -f2 | tr -d '"')
if [ -z "$ADMIN_TOKEN" ]; then
    echo "Impossible de récupérer le token admin."
    exit 1
fi


echo "Admin token: $ADMIN_TOKEN"

equipments=(
  '{"name": "Haltères", "description": "Poids libres utilisés pour la musculation.", "category": "Musculation"}'
  '{"name": "Tapis de yoga", "description": "Tapis antidérapant utilisé pour le yoga.", "category": "Yoga"}'
  '{"name": "Vélo d'\''appartement", "description": "Machine de cardio utilisée pour simuler le cyclisme.", "category": "Cyclisme"}'
  '{"name": "Corde à sauter", "description": "Équipement de cardio utilisé pour améliorer l'\''endurance.", "category": "Cardio"}'
  '{"name": "Bande de résistance", "description": "Bandes élastiques utilisées pour ajouter de la résistance.", "category": "Musculation"}'
  '{"name": "Ballon de stabilité", "description": "Ballon utilisé pour améliorer l'\''équilibre.", "category": "Pilates"}'
  '{"name": "Rameur", "description": "Machine de cardio qui simule l'\''action de la rame.", "category": "Cardio"}'
  '{"name": "Barre de traction", "description": "Équipement utilisé pour les exercices de traction.", "category": "Musculation"}'
  '{"name": "Stepper", "description": "Machine de cardio qui simule la montée des escaliers.", "category": "Cardio"}'
  '{"name": "Rouleau de mousse", "description": "Utilisé pour les exercices de récupération.", "category": "Stretching"}'
)

url="http://localhost:3000/api/equipment/new"

for equipment in "${equipments[@]}"; do
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" -d "$equipment" "$url"
  echo
done