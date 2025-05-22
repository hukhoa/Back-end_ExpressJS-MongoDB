/* eslint-disable no-console*/

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '@/config/mongodb'
import { env } from '@/config/environment'

import { APIs_V1 } from '@/routes/v1'
import { errorHandlingMiddleware } from '@/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  // Enable req.body json data
  app.use(express.json())

  // Use API V1
  app.use('/v1', APIs_V1)

  // Middleware - xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.listen(env.PORT, env.HOST, () => {
    console.log(
      `3. Hello ${env.AUTHOR}, I am running at http://${env.PORT}:${env.PORT}/`
    )
  })

  // CLEAN UP
  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnected from MONGODB')
  })
}

// CÓ 2 CÁCH KẾT NỐI
// IIFE (Immediately Invoked Function Expression / Anonymous Asyns Function)
;(async () => {
  try {
    console.log('1. Connecting to MONGODB')
    await CONNECT_DB()

    console.log('2. Connected to MONGODB')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// Kết nối db thành công thì mới start server Backend lên
// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error)
//     process.exit(0)
//   })
