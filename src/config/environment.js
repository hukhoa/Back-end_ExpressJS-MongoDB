import 'dotenv/config'

// GET VARIABLE FROM ENVIRONMENT
export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  AUTHOR: process.env.AUTHOR,
}
