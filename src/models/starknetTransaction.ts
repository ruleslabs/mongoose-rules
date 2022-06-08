import { Document, model, Schema, Types } from 'mongoose'

export interface StarknetTransaction {
  hash: string
  involvedUserIds?: Types.ObjectId[]
  state?: number
  type: number
}

// state:
//  -1 => failed
//   0 => unsynced
//   1 => sycing
//   2 => synced

// type:
//  0 => deploy account
//  1 => mint pack
//  2 => transfer pack
//  3 => mint card
//  4 => transfer card

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
  type: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
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
