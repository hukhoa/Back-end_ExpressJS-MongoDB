import { StatusCodes } from 'http-status-codes'
import { userModel } from '@/models/userModel'
import ApiError from '@/utils/ApiError'

const getAll = async (paginationParams) => {
  try {
    const result = await userModel.getAll(paginationParams)
    return result
  } catch (error) {
    throw error
  }
}

const getById = async (id) => {
  try {
    const result = await userModel.getById(id)

    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
    }

    return result
  } catch (error) {
    throw error
  }
}

const update = async (id, updateData) => {
  try {
    // Không cho phép cập nhật email và password qua API này
    const { email, password, ...allowedUpdateData } = updateData

    const dataToUpdate = {
      ...allowedUpdateData,
      updatedAt: new Date()
    }

    const updated = await userModel.update(id, dataToUpdate)

    if (!updated) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
    }

    return updated
  } catch (error) {
    throw error
  }
}

const deleteById = async (id) => {
  try {
    const result = await userModel.deleteById(id)

    if (!result || result.deletedCount === 0) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
    }

    return result
  } catch (error) {
    throw error
  }
}

export const userService = {
  getAll,
  getById,
  update,
  deleteById
}
