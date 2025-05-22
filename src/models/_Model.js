import Joi from 'joi'
import { GET_DB } from '@/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/utils/validators'

// Define Collection (name & schema)
const _COLLECTION_NAME = 'COLLECTION_NAME'
const _COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),

  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false),
})

// Handle
const createNew = async (data) => {
  try {
    const createdBoard = await GET_DB()
      .collection(_COLLECTION_NAME)
      .insertOne(data)
    return createdBoard
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(_COLLECTION_NAME)
      .findOne({ _id: id })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel = {
  _COLLECTION_NAME,
  _COLLECTION_SCHEMA,
  createNew,
  findOneById,
}
