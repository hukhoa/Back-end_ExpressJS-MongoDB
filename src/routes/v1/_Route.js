import expesss from 'express'
import { StatusCodes } from 'http-status-codes'
import { _Validation } from '@/validations/_Validation'
import { _Controller } from '@/controllers/_Controller'

const Router = expesss.Router()

/**
 * @swagger
 * /api/v1/_:
 *   get:
 *     summary: Get _
 *     tags: [_]
 *     responses:
 *       200:
 *         description: Return list _
 *         content:
 *           application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: number
 *                      example: 200
 *                    message:
 *                      type: string
 *                      example: "Get successfull"
 *                    data:
 *                      type:     array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            example: "123456"
 *                          title:
 *                            type: string
 *                            example: "title"
 *   post:
 *     summary: Create
 *     tags: [_]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "new title"
 *     responses:
 *       201:
 *         description: Create _
 *
 */

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get list boards', code: StatusCodes.OK })
  })

  // Data -> Validation(Check lỗi) -> Controller(Điều hướng)
  .get(_Controller.getAll)
  .post(_Validation.createNew, _Controller.createNew)

export const boardRoute = Router
