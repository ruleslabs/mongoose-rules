import { Document, model, Schema, Types } from 'mongoose'

export interface PackOrder {
  starterPack: boolean
  packId: Types.ObjectId
  userId: Types.ObjectId
  paymentIntentId: string
  quantity: number
  createdAt: Date
  delivered: boolean
  starknetTransactionId: Types.ObjectId
}

export interface PackOrderDocument extends PackOrder, Document {}

const PackOrderSchema = new Schema<PackOrderDocument>({
  starterPack: {
    type: Boolean,
    required: true,
  },
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
  paymentIntentId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  delivered: {
    type: Boolean,
    required: false,
    default: true,
  },
  starknetTransactionId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'StarknetTransaction',
  },
})

export const MongoPackOrder = model<PackOrderDocument>('PackOrder', PackOrderSchema, 'packOrders')
