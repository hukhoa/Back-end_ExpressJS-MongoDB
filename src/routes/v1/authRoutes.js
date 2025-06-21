import express from 'express'
import { authController } from '@/controllers/authController'
import { authValidation } from '@/validations/authValidation'

const Router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "user1@example.com"
 *         password:
 *           type: string
 *           minLength: 6
 *           example: "123456"
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 *         password:
 *           type: string
 *           minLength: 6
 *           example: "password123"
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           default: user
 *           example: "user"
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: "Login successful"
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             user:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64f5e9b8c12345678901234a"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *                 role:
 *                   type: string
 *                   example: "user"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-09-04T10:30:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-09-04T10:30:00.000Z"
 *
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 201
 *         message:
 *           type: string
 *           example: "User registered successfully"
 *         data:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "64f5e9b8c12345678901234a"
 *             name:
 *               type: string
 *               example: "John Doe"
 *             email:
 *               type: string
 *               example: "john@example.com"
 *             role:
 *               type: string
 *               example: "user"
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2023-09-04T10:30:00.000Z"
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: "2023-09-04T10:30:00.000Z"
 *
 *     AuthErrorResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Bad Request - Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             examples:
 *               validation_error:
 *                 summary: Validation error
 *                 value:
 *                   code: 400
 *                   message: "\"email\" is required"
 *               invalid_email:
 *                 summary: Invalid email format
 *                 value:
 *                   code: 400
 *                   message: "\"email\" must be a valid email"
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               code: 401
 *               message: "Invalid email or password"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               code: 500
 *               message: "Internal server error"
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Bad Request - Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             examples:
 *               validation_error:
 *                 summary: Validation error
 *                 value:
 *                   code: 400
 *                   message: "\"name\" is required"
 *               weak_password:
 *                 summary: Password too weak
 *                 value:
 *                   code: 400
 *                   message: "\"password\" length must be at least 6 characters long"
 *               invalid_email:
 *                 summary: Invalid email format
 *                 value:
 *                   code: 400
 *                   message: "\"email\" must be a valid email"
 *               invalid_role:
 *                 summary: Invalid role
 *                 value:
 *                   code: 400
 *                   message: "\"role\" must be one of [admin, user]"
 *       409:
 *         description: Conflict - Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               code: 409
 *               message: "Email already exists"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               code: 500
 *               message: "Internal server error"
 */

// Auth routes
Router.route('/login').post(authValidation.login, authController.login)
Router.route('/register').post(authValidation.register, authController.register)

export const authRoute = Router
