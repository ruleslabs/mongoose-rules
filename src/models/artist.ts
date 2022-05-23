import { Document, model, Schema, Types } from 'mongoose'

export interface Artist {
  name: string
  slug: string
  userId?: Types.ObjectId
}

export interface ArtistDocument extends Artist, Document {}

const ArtistSchema = new Schema<ArtistDocument>({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
})

export const MongoArtist = model<ArtistDocument>('Artist', ArtistSchema, 'artists')
