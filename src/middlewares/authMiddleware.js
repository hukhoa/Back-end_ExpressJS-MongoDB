import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import { userModel } from '@/models/userModel'
import { env } from '@/config/environment'

// Middleware xác thực token
const authenticateUser = async (req, res, next) => {
  try {
    // Lấy token từ header Authorization
    const token = req.header('Authorization')?.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        code: StatusCodes.UNAUTHORIZED,
        message: 'Access Denied: No token provided'
      })
    }

    // Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET)

    // Lấy thông tin user từ database (đảm bảo user vẫn tồn tại)
    const user = await userModel.getById(decoded.userId)

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        code: StatusCodes.UNAUTHORIZED,
        message: 'Invalid Token: User not found'
      })
    }

    // Gắn thông tin user vào request object
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    }

    next()
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      code: StatusCodes.UNAUTHORIZED,
      message: 'Invalid Token'
    })
  }
}

// Middleware phân quyền theo role
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        code: StatusCodes.FORBIDDEN,
        message: 'Forbidden: Insufficient permissions'
      })
    }
    next()
  }
}

// Middleware kiểm tra quyền admin
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(StatusCodes.FORBIDDEN).json({
      code: StatusCodes.FORBIDDEN,
      message: 'Forbidden: Admin access required'
    })
  }
  next()
}

// Middleware cho phép user truy cập resource của chính mình hoặc admin truy cập tất cả
const authorizeOwnerOrAdmin = (req, res, next) => {
  const { id } = req.params

  if (req.user.role === 'admin' || req.user.userId === id) {
    next()
  } else {
    return res.status(StatusCodes.FORBIDDEN).json({
      code: StatusCodes.FORBIDDEN,
      message: 'Forbidden: You can only access your own resources'
    })
  }
}

export const authMiddleware = {
  authenticateUser,
  authorizeRole,
  requireAdmin,
  authorizeOwnerOrAdmin
}
