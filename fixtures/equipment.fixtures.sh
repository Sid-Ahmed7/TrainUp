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

equipments=(
  '{"name": "Halteres", "description": "Poids libres utilises pour la musculation.", "category": "Musculation"}'
  '{"name": "Tapis de yoga", "description": "Tapis antiderapant utilise pour le yoga.", "category": "Yoga"}'
  '{"name": "Velo d'\''appartement", "description": "Machine de cardio utilisee pour simuler le cyclisme.", "category": "Cyclisme"}'
  '{"name": "Corde a sauter", "description": "Equipement de cardio utilise pour ameliorer l'\''endurance.", "category": "Cardio"}'
  '{"name": "Bande de resistance", "description": "Bandes elastiques utilisees pour ajouter de la resistance.", "category": "Musculation"}'
  '{"name": "Ballon de stabilite", "description": "Ballon utilise pour ameliorer l'\''equilibre.", "category": "Pilates"}'
  '{"name": "Rameur", "description": "Machine de cardio qui simule l'\''action de la rame.", "category": "Cardio"}'
  '{"name": "Barre de traction", "description": "Equipement utilise pour les exercices de traction.", "category": "Musculation"}'
  '{"name": "Stepper", "description": "Machine de cardio qui simule la montee des escaliers.", "category": "Cardio"}'
  '{"name": "Rouleau de mousse", "description": "Utilise pour les exercices de recuperation.", "category": "Stretching"}'
)

url="http://localhost:3000/api/equipment/new"

for equipment in "${equipments[@]}"; do
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" --data-binary "$equipment" "$url"
done