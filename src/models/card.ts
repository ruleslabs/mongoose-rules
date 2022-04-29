import { Document, model, Schema, Types } from 'mongoose'

interface Owner {
  userId?: Types.ObjectId
  starknetAddress?: string
  price?: string
  from: Date
}

export interface Card {
  slug: string
  cardModelId: Types.ObjectId
  serialNumber: number
  currentOfferId?: Types.ObjectId
  createdAt: Date
  starknetTokenId: string
  owner?: Owner
  owners: Owner[]
}

export interface CardDocument extends Card, Document {}
export interface OwnerDocument extends Owner, Document {}

const OwnerSchema = new Schema<OwnerDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
  },
  starknetAddress: String,
  price: String,
  from: {
    type: Date,
    required: true,
  }
})

const CardSchema = new Schema<CardDocument>({
  slug: {
    type: String,
    required: true,
  },
  cardModelId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'CardModel',
  },
  serialNumber: {
    type: Number,
    required: true,
  },
  currentOfferId: {
    type: Schema.Types.ObjectId,
    ref: 'Offer',
  },
  createdAt: {
    type: Date,
    required: true,
  },
  starknetTokenId: {
    type: String,
    required: true,
  },
  owner: OwnerSchema,
  owners: {
    type: [OwnerSchema],
    default: []
  },
})

export const MongoCard = model<CardDocument>('Card', CardSchema, 'cards')
