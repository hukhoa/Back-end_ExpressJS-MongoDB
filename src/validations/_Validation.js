import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '@/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title length must be at least 3 characters',
      'string.max': 'Title length must be less than or equal to 50 characters',
      'string.trim': 'Title must not have leading or trailing whitespace',
    }),

    description: Joi.string()
      .required()
      .min(3)
      .max(256)
      .trim()
      .strict()
      .messages({
        'any.required': 'Description is required',
        'string.empty': 'Description is not allowed to be empty',
        'string.min': 'Description length must be at least 3 characters',
        'string.max':
          'Description length must be  less than or equal to 256 characters',
      }),
  })

  try {
    // abortEarly - false -> trả về nếu th nhiều lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    // Validate -> Controller
    next()
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    )
  }
}

export const boardValidation = {
  createNew,
}
