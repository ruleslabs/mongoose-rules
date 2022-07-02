import mongoose, { Connection, ClientSession } from 'mongoose'

export * from './models/user'
export * from './models/card'
export * from './models/artist'
export * from './models/cardModel'
export * from './models/pack'
export * from './models/offer'
export * from './models/packOrder'
export * from './models/emailVerification'
export * from './models/starknetTransaction'
export * from './models/drawnCards'
export * from './models/passwordUpdate'
export * from './models/starknetAddress'
export * from './models/packOpening'

export let connection: Connection | typeof mongoose | null = null
export let session: ClientSession | undefined

export async function connectMongo(uri: string) {
  if (connection) {
    console.log('Already connected to database')
    return connection
  }

  connection = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s
    bufferCommands: false,
  }).then(() => mongoose)

  console.log('Connected to database')
  return connection
}

export async function startMongooseSession() {
  if (session) throw 'A session is already active'

  session = await connection?.startSession()
  if (!session) throw 'Failed to create mongoose session'

  return session
}

export function endMongooseSession() {
  session?.endSession()
  session = undefined
}
