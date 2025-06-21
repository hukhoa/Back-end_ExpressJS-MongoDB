import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import ApiError from '@/utils/ApiError'

import { env } from '@/config/environment'
import { userModel } from '@/models/userModel'
import { StatusCodes } from 'http-status-codes'

const login = async (email, password) => {
  try {
    // Tìm user theo email
    const user = await userModel.findByEmail(email)

    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
    }

    // So sánh password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
    }

    // Tạo JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role
      },
      env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Trả về thông tin user (không có password) và token
    const { password: userPassword, ...userInfo } = user

    return {
      token,
      user: userInfo
    }
  } catch (error) {
    throw error
  }
}

const register = async (userData) => {
  try {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await userModel.findByEmail(userData.email)

    if (existingUser) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email already exists')
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds)

    // Tạo user mới
    const newUserData = {
      ...userData,
      password: hashedPassword,
      role: userData.role || 'user' // Default role là 'user'
    }

    const created = await userModel.createNew(newUserData)
    const newUser = await userModel.getById(created.insertedId)

    return newUser
  } catch (error) {
    throw error
  }
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET)
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token')
  }
}

export const authService = {
  login,
  register,
  verifyToken
}
