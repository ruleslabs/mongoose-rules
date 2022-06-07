import { Document, model, Schema, Types } from 'mongoose'

export interface DrawnCards {
  packId: string
  cardIds: Types.ObjectId[]
  drawnAt: Date
}

export interface DrawnCardsDocument extends DrawnCards, Document {}

const DrawnCardsSchema = new Schema<DrawnCardsDocument>({
  packId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Pack',
  },
  cardIds: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Card',
    }],
    required: true,
  },
  drawnAt: {
    type: Date,
    required: true,
  }
})

export const MongoDrawnCards = model<DrawnCardsDocument>('DrawnCards', DrawnCardsSchema, 'drawnCardss')
