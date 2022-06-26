import { Document, model, Schema, Types } from 'mongoose'

export interface Settings {
  lastBlockNumberSynced: number
  packsMintingNonce: number
}

export interface SettingsDocument extends Settings, Document {}

const SettingsSchema = new Schema<SettingsDocument>({
  lastBlockNumberSynced: {
    type: Number,
    min: 0,
    default: 0,
  },
  packsMintingNonce: {
    type: Number,
    min: 0,
    default: 0,
  },
}, {
  capped: { size: 999999, max: 1 },
})

export const MongoSettings = model<SettingsDocument>('Settings', SettingsSchema, 'settings')
