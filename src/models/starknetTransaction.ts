import { Document, model, Schema, Types } from 'mongoose'

export interface StarknetTransaction {
  hash: string
  involvedUserIds?: Types.ObjectId[]
  synced: boolean
  rejected: boolean
  accepted: boolean
  selector: string
  initiatedByAddress: string
  initiatedAt: Date
  nonce?: number
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
  synced: {
    type: Boolean,
    default: false,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  selector: {
    type: String,
    default: 'constructor',
  },
  initiatedByAddress: {
    type: String,
    default: '0',
  },
  initiatedAt: {
    type: Date,
    required: true,
  },
  nonce: {
    type: Number,
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
