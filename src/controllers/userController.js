import { StatusCodes } from 'http-status-codes'
import { userService } from '@/services/userService'
import { paginationHelper } from '@/utils/pagination'

const getAllUsers = async (req, res, next) => {
  try {
    const paginationParams = req.pagination

    const result = await userService.getAll(paginationParams)

    const response = paginationHelper.formatPaginatedResponse(
      'Get all users successful',
      result.totalCount,
      paginationParams,
      result.data
    )

    res.status(StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await userService.getById(id)

    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'Get user successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updated = await userService.update(id, updateData)

    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'Update user successful',
      data: updated
    })
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await userService.deleteById(id)

    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'Delete user successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}
