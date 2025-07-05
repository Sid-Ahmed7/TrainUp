/**
 * @swagger
 * tags:
 *   name: Targets
 *   description: Gestion des audiences adaptées aux exercices (jeunes, personnes âgées, etc.)
 * 
 * components:
 *   schemas:
 *     Target:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de la cible
 *           example: 1
 *         name:
 *           type: string
 *           description: |
 *             Nom de la cible indiquant pour quel public l'exercice est adapté, par exemple :
 *             - jeunes
 *             - personnes âgées
 *             - sportifs
 *             - débutants
 *           example: jeunes
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /api/target/nouvelle:
 *   post:
 *     summary: Créer une nouvelle cible (audience)
 *     tags: [Targets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Target'
 *     responses:
 *       201:
 *         description: Cible créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Target'
 *       401:
 *         description: Non autorisé
 * 
 * /api/target:
 *   get:
 *     summary: Récupérer la liste de toutes les cibles
 *     tags: [Targets]
 *     responses:
 *       200:
 *         description: Liste des cibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Target'
 * 
 * /api/target/{id}:
 *   get:
 *     summary: Récupérer une cible par son ID
 *     tags: [Targets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cible
 *     responses:
 *       200:
 *         description: Cible trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Target'
 *       404:
 *         description: Cible non trouvée
 * 
 *   put:
 *     summary: Mettre à jour une cible par son ID
 *     tags: [Targets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cible à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Target'
 *     responses:
 *       200:
 *         description: Cible mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Target'
 *       404:
 *         description: Cible non trouvée
 *       401:
 *         description: Non autorisé
 * 
 *   delete:
 *     summary: Supprimer une cible par son ID
 *     tags: [Targets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cible à supprimer
 *     responses:
 *       204:
 *         description: Cible supprimée avec succès
 *       404:
 *         description: Cible non trouvée
 *       401:
 *         description: Non autorisé
 */
