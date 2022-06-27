import { Document, model, Schema, Types } from 'mongoose'
import { PackBalance } from './user'

export interface StarknetAddress {
  address: string
  packsBalances: PackBalance[]
}

export interface StarknetAddressDocument extends StarknetAddress, Document {}

const StarknetAddressSchema = new Schema<StarknetAddressDocument>({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  packsBalances: {
    type: [{
      packId: {
        type: Schema.Types.ObjectId,
        ref: 'Pack',
        required: true
      },
      balance: {
        type: Number,
        required: true,
        min: 0,
      },
    }],
    default: [],
  },
})

export const MongoStarknetAddress = model<StarknetAddressDocument>(
  'StarknetAddress',
  StarknetAddressSchema,
  'starknetAddresses'
)
