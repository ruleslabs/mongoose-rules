import { Document, model, Schema, Types } from 'mongoose'

export interface StarknetTransaction {
  hash: string
  involvedUserIds?: Types.ObjectId[]
  syncing: boolean
  failed: boolean
  accepted: boolean
  selector: string
  initiatedByAddress: string
  nonce: number
}

export interface StarknetTransactionDocument extends StarknetTransaction, Document {}

const StarknetTransactionSchema = new Schema<StarknetTransactionDocument>({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  involvedUserIds: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    default: [],
  },
  syncing: {
    type: Boolean,
    required: true,
    default: false,
  },
  failed: {
    type: Boolean,
    required: true,
    default: false,
  },
  accepted: {
    type: Boolean,
    required: true,
    default: false,
  },
  selector: {
    type: String,
    required: true,
  },
  initiatedByAddress: {
    type: String,
  },
  nonce: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'nonce: {VALUE} is not an integer value',
    },
  },
})

export const MongoStarknetTransaction = model<StarknetTransactionDocument>(
  'StarknetTransaction',
  StarknetTransactionSchema,
  'starknetTransactions'
)
