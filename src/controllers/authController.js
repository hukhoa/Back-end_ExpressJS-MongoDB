import { StatusCodes } from 'http-status-codes'
import { authService } from '@/services/authService'

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const result = await authService.login(email, password)

    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'Login successful',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const register = async (req, res, next) => {
  try {
    const userData = req.body

    const result = await authService.register(userData)

    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      message: 'User registered successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const authController = {
  login,
  register
}
