import { Document, model, Schema, Types } from 'mongoose'

export interface PackOpening {
  packId: Types.ObjectId
  userId: Types.ObjectId
  drawnCardIds?: Types.ObjectId[]
  createdAt: Date
  openingPreparationStarknetTransactionId?: Types.ObjectId
  openingStarknetTransactionId?: Types.ObjectId
  completed: boolean
  needsOpening: boolean
}

export interface PackOpeningDocument extends PackOpening, Document {}

const PackOpeningSchema = new Schema<PackOpeningDocument>({
  packId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Pack',
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  drawnCardIds: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Card',
    }],
  },
  createdAt: {
    type: Date,
    required: true,
  },
  openingPreparationStarknetTransactionId: {
    type: Schema.Types.ObjectId,
    ref: 'StarknetTransaction',
  },
  openingStarknetTransactionId: {
    type: Schema.Types.ObjectId,
    ref: 'StarknetTransaction',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  needsOpening: {
    type: Boolean,
    default: false,
  },
})

export const MongoPackOpening = model<PackOpeningDocument>('PackOpening', PackOpeningSchema, 'packOpenings')
