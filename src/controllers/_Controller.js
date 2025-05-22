import { StatusCodes } from 'http-status-codes'
import { boardService } from '@/services/_Service'

const createNew = async (req, res, next) => {
  try {
    console.log('res.body:' + JSON.stringify(req.body))
    // console.log('res.query:' + JSON.stringify(req.query))
    // console.log('res.params:' + JSON.stringify(req.params))
    // console.log('res.files:' + JSON.stringify(req.files))
    // console.log('res.cookies:' + JSON.stringify(req.cookies))
    // console.log('res.jwtDecoded:' + JSON.stringify(req.jwtDecoded))

    // NAVIGATION TO SERVICE
    const createdBoard = await boardService.createNew(req.body)

    // RETURN CLIENT
    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      createdBoard,
    })
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew,
}
