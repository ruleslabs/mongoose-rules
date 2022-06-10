import { Document, model, Schema, Types } from 'mongoose'

export interface PasswordUpdate {
  initiatedByIP: string
  userId: Types.ObjectId
  initiatedAt: Date
  token: string
}

export interface PasswordUpdateDocument extends PasswordUpdate, Document {}

const PasswordUpdateSchema = new Schema<PasswordUpdateDocument>({
  initiatedByIP: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  initiatedAt: {
    type: Date,
    required: true,
    expires: 900,
  },
  token: {
    type: String,
    required: true,
  },
})

export const MongoPasswordUpdate = model<PasswordUpdateDocument>(
  'PasswordUpdate',
  PasswordUpdateSchema,
  'passwordUpdates'
)
