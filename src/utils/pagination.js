import { StatusCodes } from 'http-status-codes'
import ApiError from '@/utils/ApiError'

/**
 * Validate và normalize pagination parameters
 * @param {Object} query - Query parameters từ request
 */
const validatePaginationParams = (query) => {
  const { page = 1, limit = 10, sortBy = 'createdAt', order = 'asc' } = query

  // Validate page
  const pageNum = parseInt(page)
  if (isNaN(pageNum) || pageNum < 1) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Page must be a positive integer')
  }

  // Validate limit
  const limitNum = parseInt(limit)
  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Limit must be between 1 and 100')
  }

  // Validate order
  const orderValue = order.toLowerCase()
  if (!['asc', 'desc'].includes(orderValue)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Order must be "asc" or "desc"')
  }

  return {
    page: pageNum,
    limit: limitNum,
    sortBy: sortBy.toString(),
    order: orderValue,
    skip: (pageNum - 1) * limitNum
  }
}

/**
 * Tạo pagination metadata
 * @param {number} totalItems - Tổng số items
 * @param {number} page - Trang hiện tại
 * @param {number} limit - Số items per page
 */
const createPaginationMeta = (totalItems, page, limit) => {
  const totalPages = Math.ceil(totalItems / limit)

  return {
    currentPage: page,
    totalPages,
    totalItems,
    itemsPerPage: limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null
  }
}

/**
 * Format response với pagination
 * @param {string} message - Success message
 * @param {number} totalItems - Tổng số items
 * @param {Object} paginationParams - Pagination parameters (page, limit)
 * @param {Array} data - Dữ liệu trả về
 */
const formatPaginatedResponse = (message = 'Get successful', totalItems, paginationParams, data) => {
  const { page, limit } = paginationParams
  const pagination = createPaginationMeta(totalItems, page, limit)

  return {
    code: StatusCodes.OK,
    message: message,
    pagination,
    data
  }
}

/**
 * Middleware validate pagination params -> controller
 */
const validatePaginationMiddleware = (req, res, next) => {
  try {
    const paginationParams = validatePaginationParams(req.query)
    req.pagination = paginationParams
    next()
  } catch (error) {
    next(error)
  }
}

export const paginationHelper = {
  validatePaginationParams,
  createPaginationMeta,
  formatPaginatedResponse,
  validatePaginationMiddleware
}
