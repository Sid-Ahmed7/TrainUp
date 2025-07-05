/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API pour gérer les catégories
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de la catégorie
 *           example: 1
 *         name:
 *           type: string
 *           description: Nom de la catégorie
 *           example: Cardio
 */

/**
 * @swagger
 * /api/categorie/nouvelle:
 *   post:
 *     summary: Crée une nouvelle catégorie
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Objet catégorie à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/categorie:
 *   get:
 *     summary: Récupère toutes les catégories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Liste des catégories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /api/categorie/{id}:
 *   get:
 *     summary: Récupère une catégorie par ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la catégorie à récupérer
 *     responses:
 *       200:
 *         description: Catégorie trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Catégorie non trouvée
 */

/**
 * @swagger
 * /api/categorie/{id}:
 *   put:
 *     summary: Met à jour une catégorie par ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la catégorie à mettre à jour
 *     requestBody:
 *       description: Données de la catégorie à mettre à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Catégorie mise à jour avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Catégorie non trouvée
 */

/**
 * @swagger
 * /api/categorie/{id}:
 *   delete:
 *     summary: Supprime une catégorie par ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la catégorie à supprimer
 *     responses:
 *       204:
 *         description: Catégorie supprimée avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Catégorie non trouvée
 */
