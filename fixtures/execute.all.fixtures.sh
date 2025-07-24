#!/bin/bash

DIR="$(dirname "$0")"

bash "$DIR/category.fixtures.sh"
bash "$DIR/badge.fixtures.sh"
bash "$DIR/rewards.fixtures.sh"
bash "$DIR/equipment.fixtures.sh"
bash "$DIR/target.fixtures.sh"

echo "Tous les scripts de fixtures ont été exécutés."