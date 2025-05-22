import expesss from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '@/validations/boardValidation'
import { boardController } from '@/controllers/_Controller'

const Router = expesss.Router()

Router.route('/')
  .get((req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: 'GET: API get list boards', code: StatusCodes.OK })
  })

  // Data -> Validation(Check lỗi) -> Controller(Điều hướng)
  .post(boardValidation.createNew, boardController.createNew)

export const boardRoute = Router
