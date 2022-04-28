import mongoose, { Connection } from 'mongoose'

export * from './models/user'
export * from './models/card'
export * from './models/artist'
export * from './models/cardModel'
export * from './models/pack'
export * from './models/offer'
export * from './models/packOrder'

export let connection: Connection | undefined

export function connectMongo() {
  mongoose.connect(process.env.MONGODB_URI ?? '', {
    serverSelectionTimeoutMS: 5000 // Timeout after 5s
  }).catch(err => console.log(err.reason))

  connection = mongoose.connection
  connection.on('error', console.error.bind(console, 'connection error:'))
  connection.once('open', () => console.log('Connected to database'))
}
