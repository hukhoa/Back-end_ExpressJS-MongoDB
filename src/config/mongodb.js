import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '@/config/environment'

// Not Connect -> null
let databaseInstance = null

// SET UP: CONNECT SERVER
/*const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // Chỉ định Stable API, lỗi các kiểu...
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
*/

// SET UP: CONNECT LOCALHOST
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// CONNECT DB
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()

  databaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// DISCONNECT DB
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

// GET DB
export const GET_DB = () => {
  if (!databaseInstance) throw new Error('Must connect to DB first')

  return databaseInstance
}
