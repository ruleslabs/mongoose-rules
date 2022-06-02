import { Document, model, Schema, Types } from 'mongoose'

export interface StarknetTransaction {
  hash: string
  involvedUserIds?: Types.ObjectId[]
  state?: number
}

// state:
//  -1 => failed
//   0 => unsynced
//   1 => sycing
//   2 => synced

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
  state: {
    type: Number,
    default: 0,
    min: -1,
    max: 2,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value',
    },
  },
})

export const MongoStarknetTransaction = model<StarknetTransactionDocument>(
  'StarknetTransaction',
  StarknetTransactionSchema,
  'starknetTransactions'
)
