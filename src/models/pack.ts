import { Document, model, Schema, Types } from 'mongoose'

import {
  MIN_PRICE,
  MIN_SEASON,
  MIN_CARDS_PER_PACK,
  MAX_CARDS_PER_PACK,
  MIN_PACK_CARD_MODEL_QUANTITY,
  MIN_PACK_MAX_SUPPLY,
} from '@/constants'

export interface PackCardModel {
  cardModelId: Types.ObjectId
  quantity: number
}

export interface Pack {
  name: string
  slug: string
  price: number
  cardsPerPack: number
  cardModels?: PackCardModel[]
  maxSupply?: number
  supply: number
  releaseDate?: Date
  season?: number
  starknetTokenId: string
  maxQuantityPerUser: number
}

export interface PackDocument extends Pack, Document {}

const PackSchema = new Schema<PackDocument>({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: MIN_PRICE,
  },
  cardsPerPack: {
    type: Number,
    required: true,
    min: MIN_CARDS_PER_PACK,
    max: MAX_CARDS_PER_PACK,
  },
  maxQuantityPerUser: {
    type: Number,
    required: true,
  },
  cardModels: {
    type: [{
      cardModelId: {
        type: Schema.Types.ObjectId,
        ref: 'CardModel',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: MIN_PACK_CARD_MODEL_QUANTITY,
      },
    }],
    default: undefined,
  },
  maxSupply: {
    type: Number,
    min: MIN_PACK_MAX_SUPPLY,
  },
  supply: {
    type: Number,
    required: true,
    min: 0,
  },
  releaseDate: Date,
  season: {
    type: Number,
    min: MIN_SEASON,
  },
  starknetTokenId: {
    type: String,
    required: true,
  },
})

export const MongoPack = model<PackDocument>('Pack', PackSchema, 'packs')
