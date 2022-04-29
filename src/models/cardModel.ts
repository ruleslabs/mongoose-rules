import { Document, model, Schema, Types } from 'mongoose'

export interface CardModel {
  name: string
  slug: string
  season: number
  scarcity: number
  artistId: Types.ObjectId
  lowestAsk?: string
  averageSell?: string
  cardsOnSaleCount: number
  youtubePreviewId: string
  nextSerialNumber: number
  unavailableSerialNumbers: number[]
  ipfsVideoHash?: string
}

export interface CardModelDocument extends CardModel, Document {}

const CardModelSchema = new Schema<CardModelDocument>({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  season: {
    type: Number,
    required: true,
  },
  scarcity: {
    type: Number,
    required: true,
  },
  artistId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Artist',
  },
  lowestAsk: String,
  averageSell: String,
  cardsOnSaleCount: {
    type: Number,
    required: true,
    default: 0,
  },
  youtubePreviewId: {
    type: String,
    required: false,
  },
  nextSerialNumber: {
    type: Number,
    required: false,
    default: 1,
  },
  unavailableSerialNumbers: {
    type: [Number],
    default: [],
    required: false,
  },
  ipfsVideoHash: String,
})

export const MongoCardModel = model<CardModelDocument>('CardModel', CardModelSchema, 'card-models')
