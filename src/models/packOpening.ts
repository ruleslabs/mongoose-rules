import { Document, model, Schema, Types } from 'mongoose'

export interface PackOpening {
  packId: Types.ObjectId
  userId: Types.ObjectId
  drawCardsId?: Types.ObjectId
  createdAt: Date
  openingPreparationStarknetTransactionId?: Types.ObjectId
  openingStarknetTransactionId?: Types.ObjectId
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
  drawCardsId: {
    type: Schema.Types.ObjectId,
    ref: 'DrawCards',
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
})

export const MongoPackOpening = model<PackOpeningDocument>('PackOpening', PackOpeningSchema, 'packOpenings')
