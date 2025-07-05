/**
 * @swagger
 * tags:
 *   - name: TypeExercices
 *     description: Gestion des types d'exercices sportifs détaillés avec catégories, audiences, équipements, etc.
 * 
 * components:
 *   schemas:
 *     TypeExercice:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - targetMuscles
 *         - categoryId
 *         - difficultyLevel
 *         - environment
 *         - instructions
 *         - tips
 *         - audienceIds
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de l'exercice
 *           example: 1
 *         name:
 *           type: string
 *           description: Nom de l'exercice
 *           example: Pompes
 *         description:
 *           type: string
 *           description: Description détaillée de l'exercice
 *           example: Exercice de renforcement musculaire des pectoraux
 *         targetMuscles:
 *           type: array
 *           description: Liste des muscles ciblés
 *           items:
 *             type: string
 *           example:
 *             - pectoraux
 *             - triceps
 *         categoryId:
 *           type: integer
 *           description: Identifiant de la catégorie liée à cet exercice
 *           example: 3
 *         difficultyLevel:
 *           type: string
 *           description: Niveau de difficulté de l'exercice
 *           enum:
 *             - BEGINNER
 *             - INTERMEDIATE
 *             - ADVANCED
 *           example: BEGINNER
 *         environment:
 *           type: string
 *           description: Environnement dans lequel l'exercice se pratique
 *           enum:
 *             - GYM
 *             - HOME
 *             - OUTDOOR
 *             - MIXED
 *           example: HOME
 *         instructions:
 *           type: string
 *           description: Instructions pour réaliser l'exercice
 *           example: "Maintenir le corps droit, descendre lentement..."
 *         tips:
 *           type: string
 *           description: Conseils pour améliorer la pratique
 *           example: "Respirer profondément pendant l'effort"
 *         imageUrl:
 *           type: string
 *           nullable: true
 *           description: URL d'une image illustrant l'exercice
 *           example: "https://monapp.com/images/pompes.jpg"
 *         complementaryExerciceIds:
 *           type: array
 *           description: Liste des IDs d'exercices complémentaires
 *           items:
 *             type: integer
 *           example:
 *             - 2
 *             - 5
 *         audienceIds:
 *           type: array
 *           description: > 
 *             Liste des IDs des audiences adaptées à cet exercice (ex: jeunes, seniors)
 *           items:
 *             type: integer
 *           example:
 *             - 1
 *             - 3
 *         usageCount:
 *           type: integer
 *           description: Nombre d'utilisations de cet exercice
 *           example: 100
 *         averageRating:
 *           type: number
 *           format: float
 *           nullable: true
 *           description: Note moyenne attribuée à l'exercice
 *           example: 4.5
 *         averageSuccessRate:
 *           type: number
 *           format: float
 *           nullable: true
 *           description: Taux moyen de réussite
 *           example: 0.75
 *         duration:
 *           type: integer
 *           nullable: true
 *           description: Durée recommandée en secondes
 *           example: 60
 *         averageCalories:
 *           type: integer
 *           nullable: true
 *           description: Calories moyennes brûlées
 *           example: 100
 *         repetitionsRecommended:
 *           type: integer
 *           nullable: true
 *           description: Nombre de répétitions recommandées
 *           example: 15
 *         durationPerRep:
 *           type: integer
 *           nullable: true
 *           description: Durée moyenne par répétition en secondes
 *           example: 4
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de la dernière mise à jour
 * 
 *     CreateTypeExerciceDTO:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - targetMuscles
 *         - categoryId
 *         - difficultyLevel
 *         - environment
 *         - instructions
 *         - tips
 *         - audienceIds
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         targetMuscles:
 *           type: array
 *           items:
 *             type: string
 *         categoryId:
 *           type: integer
 *         difficultyLevel:
 *           type: string
 *           enum:
 *             - BEGINNER
 *             - INTERMEDIATE
 *             - ADVANCED
 *         environment:
 *           type: string
 *           enum:
 *             - GYM
 *             - HOME
 *             - OUTDOOR
 *             - MIXED
 *         instructions:
 *           type: string
 *         tips:
 *           type: string
 *         imageUrl:
 *           type: string
 *           nullable: true
 *         complementaryExerciceIds:
 *           type: array
 *           items:
 *             type: integer
 *         audienceIds:
 *           type: array
 *           items:
 *             type: integer
 *         usageCount:
 *           type: integer
 *           nullable: true
 *         averageRating:
 *           type: number
 *           format: float
 *           nullable: true
 *         averageSuccessRate:
 *           type: number
 *           format: float
 *           nullable: true
 *         duration:
 *           type: integer
 *           nullable: true
 *         averageCalories:
 *           type: integer
 *           nullable: true
 *         repetitionsRecommended:
 *           type: integer
 *           nullable: true
 *         durationPerRep:
 *           type: integer
 *           nullable: true
 * 
 *     UpdateTypeExerciceDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateTypeExerciceDTO'
 *         - type: object
 *           properties:
 *             name:
 *               type: string
 *               nullable: true
 *             description:
 *               type: string
 *               nullable: true
 *             targetMuscles:
 *               type: array
 *               items:
 *                 type: string
 *               nullable: true
 *             categoryId:
 *               type: integer
 *               nullable: true
 *             difficultyLevel:
 *               type: string
 *               enum:
 *                 - BEGINNER
 *                 - INTERMEDIATE
 *                 - ADVANCED
 *               nullable: true
 *             environment:
 *               type: string
 *               enum:
 *                 - GYM
 *                 - HOME
 *                 - OUTDOOR
 *                 - MIXED
 *               nullable: true
 *             instructions:
 *               type: string
 *               nullable: true
 *             tips:
 *               type: string
 *               nullable: true
 *             imageUrl:
 *               type: string
 *               nullable: true
 *             complementaryExerciceIds:
 *               type: array
 *               items:
 *                 type: integer
 *               nullable: true
 *             audienceIds:
 *               type: array
 *               items:
 *                 type: integer
 *               nullable: true
 *             usageCount:
 *               type: integer
 *               nullable: true
 *             averageRating:
 *               type: number
 *               format: float
 *               nullable: true
 *             averageSuccessRate:
 *               type: number
 *               format: float
 *               nullable: true
 *             duration:
 *               type: integer
 *               nullable: true
 *             averageCalories:
 *               type: integer
 *               nullable: true
 *             repetitionsRecommended:
 *               type: integer
 *               nullable: true
 *             durationPerRep:
 *               type: integer
 *               nullable: true
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /api/type-exercice/nouveau:
 *   post:
 *     summary: Créer un nouveau type d'exercice
 *     tags:
 *       - TypeExercices
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Données du type d'exercice à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTypeExerciceDTO'
 *     responses:
 *       201:
 *         description: Type d'exercice créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TypeExercice'
 *       400:
 *         description: Erreur de validation ou catégorie non trouvée
 *       401:
 *         description: Non autorisé
 * 
 * /api/type-exercice:
 *   get:
 *     summary: Récupérer tous les types d'exercices
 *     tags:
 *       - TypeExercices
 *     responses:
 *       200:
 *         description: Liste des types d'exercices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TypeExercice'
 * 
 * /api/type-exercice/{id}:
 *   get:
 *     summary: Récupérer un type d'exercice par ID
 *     tags:
 *       - TypeExercices
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du type d'exercice
 *     responses:
 *       200:
 *         description: Type d'exercice trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TypeExercice'
 *       404:
 *         description: Type d'exercice non trouvé
 * 
 *   put:
 *     summary: Mettre à jour un type d'exercice par ID
 *     tags:
 *       - TypeExercices
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du type d'exercice à modifier
 *     requestBody:
 *       description: Données mises à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTypeExerciceDTO'
 *     responses:
 *       200:
 *         description: Type d'exercice mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TypeExercice'
 *       404:
 *         description: Type d'exercice non trouvé
 *       401:
 *         description: Non autorisé
 * 
 *   delete:
 *     summary: Supprimer un type d'exercice par ID
 *     tags:
 *       - TypeExercices
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du type d'exercice à supprimer
 *     responses:
 *       204:
 *         description: Type d'exercice supprimé avec succès
 *       404:
 *         description: Type d'exercice non trouvé
 *       401:
 *         description: Non autorisé
 */
