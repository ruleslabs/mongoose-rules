import { Document, model, Schema, Types } from 'mongoose'

export interface EmailVerification {
  initiatedByIP: string
  initiatedAt: Date
  username: string
  email: string
  verificationCode: string
  attemptsCount: number
}

export interface EmailVerificationDocument extends EmailVerification, Document {}

const EmailVerificationSchema = new Schema<EmailVerificationDocument>({
  initiatedByIP: {
    type: String,
    required: true,
  },
  initiatedAt: {
    type: Date,
    required: true,
    expires: 900,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  attemptsCount: {
    type: Number,
    default: 0,
  },
})

export const MongoEmailVerification = model<EmailVerificationDocument>(
  'EmailVerification',
  EmailVerificationSchema,
  'emailVerifications'
)
