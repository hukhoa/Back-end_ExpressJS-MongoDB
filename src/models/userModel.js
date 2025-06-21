import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '@/config/mongodb'

const _COLLECTION_NAME = 'users'
const _COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(2).max(100).trim().strict(),
  email: Joi.string().email().required().trim().strict(),
  password: Joi.string().required().min(6),
  role: Joi.string().valid('admin', 'editor', 'user').default('user'),
  createdAt: Joi.date().default(Date.now),
  updatedAt: Joi.date().default(Date.now)
})

// Sort object
const createSortObject = (sortBy, order) => {
  const sortOrder = order === 'asc' ? 1 : -1
  return { [sortBy]: sortOrder }
}

// Validate dữ liệu trước khi lưu vào DB
const validateBeforeCreate = async (data) => {
  return await _COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const findByEmail = async (email) => {
  try {
    return await GET_DB().collection(_COLLECTION_NAME).findOne({ email: email })
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async (paginationParams) => {
  const { skip, limit, sortBy, order } = paginationParams
  const sortObject = createSortObject(sortBy, order)

  try {
    const [data, totalCount] = await Promise.all([
      GET_DB()
        .collection(_COLLECTION_NAME)
        .find({}, { projection: { password: 0 } })
        .sort(sortObject)
        .skip(skip)
        .limit(limit)
        .toArray(),
      GET_DB().collection(_COLLECTION_NAME).countDocuments()
    ])

    return { data, totalCount }
  } catch (error) {
    throw new Error(error)
  }
}

const getById = async (id) => {
  try {
    return await GET_DB()
      .collection(_COLLECTION_NAME)
      .findOne(
        { _id: new ObjectId(id) },
        { projection: { password: 0 } } // Không trả về password
      )
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const created = await GET_DB()
      .collection(_COLLECTION_NAME)
      .insertOne({
        ...validData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    return created
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (userId, updateData) => {
  try {
    const result = await GET_DB()
      .collection(_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            ...updateData,
            updatedAt: new Date()
          }
        },
        {
          returnDocument: 'after',
          projection: { password: 0 } // Không trả về password
        }
      )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const userModel = {
  _COLLECTION_NAME,
  _COLLECTION_SCHEMA,
  validateBeforeCreate,
  findByEmail,
  getAll,
  getById,
  createNew,
  update,
  deleteById
}
