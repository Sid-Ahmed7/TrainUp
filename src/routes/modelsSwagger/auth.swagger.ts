/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion des utilisateurs et authentification
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jean Dupont
 *               email:
 *                 type: string
 *                 example: jean.dupont@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *               role:
 *                 type: string
 *                 example: USER
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Erreur lors de l'inscription
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: jean.dupont@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *     responses:
 *       200:
 *         description: Connexion réussie, tokens retournés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Erreur d'authentification
 */

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Renouveler un access token avec un refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Nouveaux tokens retournés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Refresh token invalide ou expiré
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Jean Dupont
 *         email:
 *           type: string
 *           example: jean.dupont@example.com
 *         role:
 *           type: string
 *           example: USER
 *         refreshToken:
 *           type: string
 *           nullable: true
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: '2024-01-01T12:00:00Z'
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: '2024-01-01T12:00:00Z'
 */
