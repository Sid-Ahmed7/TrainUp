/**
 * @swagger
 * tags:
 *   name: Equipments
 *   description: API pour gérer les équipements
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de l'équipement
 *           example: 1
 *         name:
 *           type: string
 *           description: Nom unique de l'équipement
 *           example: Haltère
 *         description:
 *           type: string
 *           description: Description optionnelle de l'équipement
 *           example: Poids libre utilisé pour le renforcement musculaire
 */

/**
 * @swagger
 * /api/equipment/nouveau:
 *   post:
 *     summary: Crée un nouvel équipement
 *     tags: [Equipments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Objet équipement à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       201:
 *         description: Équipement créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/equipment:
 *   get:
 *     summary: Récupère tous les équipements
 *     tags: [Equipments]
 *     responses:
 *       200:
 *         description: Liste des équipements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipment'
 */

/**
 * @swagger
 * /api/equipment/{id}:
 *   get:
 *     summary: Récupère un équipement par ID
 *     tags: [Equipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'équipement à récupérer
 *     responses:
 *       200:
 *         description: Équipement trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       404:
 *         description: Équipement non trouvé
 */

/**
 * @swagger
 * /api/equipment/{id}:
 *   put:
 *     summary: Met à jour un équipement par ID
 *     tags: [Equipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'équipement à mettre à jour
 *     requestBody:
 *       description: Données de l'équipement à mettre à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       200:
 *         description: Équipement mis à jour avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Équipement non trouvé
 */

/**
 * @swagger
 * /api/equipment/{id}:
 *   delete:
 *     summary: Supprime un équipement par ID
 *     tags: [Equipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'équipement à supprimer
 *     responses:
 *       204:
 *         description: Équipement supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Équipement non trouvé
 */
