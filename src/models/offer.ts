import { Document, model, Schema, Types } from 'mongoose'

export interface Offer {
  cardId: Types.ObjectId
  cardModelId: Types.ObjectId
  userId: Types.ObjectId
  ask: string
  createdAt: Date
  acceptedAt: Date
}

export interface OfferDocument extends Offer, Document {}

const OfferSchema = new Schema<OfferDocument>({
  cardId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Card',
  },
  cardModelId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'CardModel',
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  ask: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  acceptedAt: Date,
})

export const MongoOffer = model<OfferDocument>('Offer', OfferSchema, 'offers')
