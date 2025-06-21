import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '@/utils/ApiError'

const login = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().required().trim().strict().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email',
      'string.empty': 'Email must not be empty'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password must not be empty'
    })
  })

  try {
    // abortEarly - false -> trả về nếu th nhiều lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    // Validate -> Controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const register = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(2).max(100).trim().strict().messages({
      'any.required': 'Name is required',
      'string.empty': 'Name must not be empty',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name must be less than or equal to 100 characters'
    }),
    email: Joi.string().email().required().trim().strict().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email',
      'string.empty': 'Email must not be empty'
    }),
    password: Joi.string().required().min(6).messages({
      'any.required': 'Password is required',
      'string.empty': 'Password must not be empty',
      'string.min': 'Password must be at least 6 characters'
    }),
    role: Joi.string().valid('admin', 'user', 'editor').default('user').messages({
      'any.only': 'Role must be either admin, editor or user'
    })
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const authValidation = {
  login,
  register
}
