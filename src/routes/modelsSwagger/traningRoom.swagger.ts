/**
 * @swagger
 * tags:
 *   name: Training Rooms
 *   description: Gestion des salles d'entraînement
 *
 * components:
 *   schemas:
 *     TrainingRoom:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - capacity
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de la salle
 *           example: 1
 *         name:
 *           type: string
 *           description: Nom de la salle d'entraînement
 *           example: "Fitness Plus Central"
 *         address:
 *           type: string
 *           description: Adresse complète de la salle
 *           example: "123 Rue de la Forme, 75001 Paris"
 *         description:
 *           type: string
 *           description: Description des installations et équipements
 *           example: "Salle moderne avec équipements de dernière génération"
 *         capacity:
 *           type: integer
 *           minimum: 1
 *           description: Capacité d'accueil maximale
 *           example: 50
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des équipements disponibles
 *           example: ["Tapis de course", "Haltères", "Vélos elliptiques"]
 *         activities:
 *           type: array
 *           items:
 *             type: string
 *           description: Types d'activités proposées
 *           example: ["Musculation", "Cardio", "Yoga"]
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *           description: Statut d'approbation de la salle
 *           example: "PENDING"
 *         phone:
 *           type: string
 *           description: Numéro de téléphone de contact
 *           example: "01 23 45 67 89"
 *         email:
 *           type: string
 *           format: email
 *           description: Email de contact
 *           example: "contact@fitnessplus.com"
 *         website:
 *           type: string
 *           format: uri
 *           description: Site web de la salle
 *           example: "https://www.fitnessplus.com"
 *         owner:
 *           $ref: '#/components/schemas/User'
 *         ownerId:
 *           type: integer
 *           description: ID du propriétaire
 *           example: 2
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière modification
 *
 *     CreateTrainingRoomDto:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *           description: Nom de la salle d'entraînement
 *           example: "Fitness Plus Central"
 *         address:
 *           type: string
 *           description: Adresse complète de la salle
 *           example: "123 Rue de la Forme, 75001 Paris"
 *         description:
 *           type: string
 *           description: Description des installations
 *           example: "Salle moderne avec équipements de dernière génération"
 *         capacity:
 *           type: integer
 *           minimum: 1
 *           description: Capacité d'accueil maximale
 *           example: 50
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des équipements disponibles
 *           example: ["Tapis de course", "Haltères", "Vélos elliptiques"]
 *         activities:
 *           type: array
 *           items:
 *             type: string
 *           description: Types d'activités proposées
 *           example: ["Musculation", "Cardio", "Yoga"]
 *         phone:
 *           type: string
 *           description: Numéro de téléphone
 *           example: "01 23 45 67 89"
 *         email:
 *           type: string
 *           format: email
 *           description: Email de contact
 *           example: "contact@fitnessplus.com"
 *         website:
 *           type: string
 *           format: uri
 *           description: Site web
 *           example: "https://www.fitnessplus.com"
 *
 * /api/training-rooms:
 *   post:
 *     summary: Créer une nouvelle salle d'entraînement
 *     description: Permet aux propriétaires de créer une demande de salle (statut PENDING par défaut)
 *     tags: [Training Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTrainingRoomDto'
 *     responses:
 *       201:
 *         description: Salle créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingRoom'
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Propriétaire introuvable"
 *       401:
 *         description: Non authentifié
 *
 *   get:
 *     summary: Lister les salles d'entraînement
 *     description: Récupère la liste des salles avec filtrage optionnel par statut
 *     tags: [Training Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *         required: false
 *         description: Filtrer par statut d'approbation
 *         example: "APPROVED"
 *     responses:
 *       200:
 *         description: Liste des salles récupérée
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingRoom'
 *       401:
 *         description: Non authentifié
 *
 * /api/training-rooms/{id}:
 *   get:
 *     summary: Récupérer une salle par son ID
 *     tags: [Training Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la salle
 *         example: 1
 *     responses:
 *       200:
 *         description: Salle trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingRoom'
 *       404:
 *         description: Salle introuvable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Salle introuvable"
 *       401:
 *         description: Non authentifié
 *
 *   put:
 *     summary: Modifier une salle d'entraînement
 *     description: Modifie les informations d'une salle (propriétaire ou admin seulement)
 *     tags: [Training Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la salle à modifier
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTrainingRoomDto'
 *     responses:
 *       200:
 *         description: Salle modifiée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingRoom'
 *       400:
 *         description: Erreur de validation ou accès refusé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Accès refusé"
 *       404:
 *         description: Salle introuvable
 *       401:
 *         description: Non authentifié
 *
 *   delete:
 *     summary: Supprimer une salle d'entraînement
 *     description: Supprime définitivement une salle (admin seulement)
 *     tags: [Training Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la salle à supprimer
 *         example: 1
 *     responses:
 *       204:
 *         description: Salle supprimée avec succès
 *       400:
 *         description: Erreur lors de la suppression
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Salle introuvable
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *
 * /api/admin/training-rooms/{id}/approve:
 *   post:
 *     summary: Approuver une salle d'entraînement
 *     description: Approuve une demande de salle (admin seulement)
 *     tags: [Admin - Training Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la salle à approuver
 *         example: 1
 *     responses:
 *       200:
 *         description: Salle approuvée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingRoom'
 *       400:
 *         description: Erreur lors de l'approbation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Salle introuvable
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé - Admin requis
 *
 * /api/admin/training-rooms/{id}/reject:
 *   post:
 *     summary: Rejeter une salle d'entraînement
 *     description: Rejette une demande de salle (admin seulement)
 *     tags: [Admin - Training Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la salle à rejeter
 *         example: 1
 *     responses:
 *       200:
 *         description: Salle rejetée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingRoom'
 *       400:
 *         description: Erreur lors du rejet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Salle introuvable
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé - Admin requis
 */
