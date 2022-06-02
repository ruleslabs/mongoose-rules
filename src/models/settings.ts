import { Document, model, Schema, Types } from 'mongoose'

export interface Settings {
  lastBlockNumberSynced: number
}

export interface SettingsDocument extends Settings, Document {}

const SettingsSchema = new Schema<SettingsDocument>({
  lastBlockNumberSynced: {
    type: Number,
    min: 0,
    required: true,
  },
})

export const MongoSettings = model<SettingsDocument>('Settings', SettingsSchema, 'settings')
