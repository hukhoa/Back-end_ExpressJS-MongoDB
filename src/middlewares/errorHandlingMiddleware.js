/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
// import { env } from '@/config/environment'

// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
export const errorHandlingMiddleware = (err, req, res, next) => {
  // Nếu không có mã cụ thể (STATUS CODE) -> Mặc định: code 500(INTERNAL_SERVER_ERROR)
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  //Initial Error
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], // Không message -> Mặc định: default message - INTERNAL_SERVER_ERROR
    stack: err.stack, // Nơi xảy ra lỗi
  }
  console.error(responseError)

  // Trả responseError về phía Front-end
  res.status(responseError.statusCode).json(responseError)
}
