import expesss from 'express'
import { StatusCodes } from 'http-status-codes'

import { _Route } from '@/routes/v1/_Route'

const Router = expesss.Router()

/* Check API-v1 status */
Router.get('/status', (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ message: 'APIS v1 are ready to use.', code: StatusCodes.OK })
})

/* API - Đường dẫn*/
Router.use('/user', _Route)

export const APIs_V1 = Router
