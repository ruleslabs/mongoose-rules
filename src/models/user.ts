import { Document, model, Schema, Types } from 'mongoose'

export interface PackBalance {
  packId: Types.ObjectId
  balance: number
}

export interface DeckCard {
  cardSlug: string
  cardIndex: number
}

interface RulesPrivateKey {
  encryptedPrivateKey: string
  iv: string
  salt: string
}

interface UserProfile {
  avatarId?: number
  certified: boolean
  discordUsername?: string
  twitterUsername?: string
  instagramUsername?: string
}

export interface User {
  createdAt: Date
  username: string
  email: string
  password: string
  paymentMethodFingerprints: string[]
  starknetAddress?: string
  showcasedDeck: DeckCard[]
  refreshTokens: string[]
  profile: UserProfile
  rulesPrivateKey?: RulesPrivateKey
  rulesPrivateKeyBackup?: string
  packsBalances: PackBalance[]
}

export interface UserDocument extends User, Document {}
export interface UserProfileDocument extends UserProfile, Document {}

const UserProfileSchema = new Schema<UserProfileDocument>({
  avatarId: Number,
  certified: {
    type: Boolean,
    required: true,
  },
  discordUsername: String,
  twitterUsername: String,
  instagramUsername: String,
})

const UserSchema = new Schema<UserDocument>({
  createdAt: {
    type: Date,
    required: true
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  paymentMethodFingerprints: {
    type: [String],
    default: [],
    required: true,
  },
  refreshTokens: {
    type: [String],
    default: [],
    required: true,
  },
  showcasedDeck: {
    type: [{
      cardSlug: {
        type: String,
        required: true,
      },
      cardIndex: {
        type: Number,
        required: true,
      },
    }],
    default: [],
    validate: {
      validator: (array: any[]) => array.length <= 5,
      message: '{PATH} exceeds the limit of 5',
    },
    required: true,
  },
  profile: {
    type: UserProfileSchema,
    required: true
  },
  starknetAddress: String,
  rulesPrivateKey: {
    type: {
      encryptedPrivateKey: {
        type: String,
        required: true,
      },
      iv: {
        type: String,
        required: true,
      },
      salt: {
        type: String,
        required: true,
      },
    },
    required: false
  },
  rulesPrivateKeyBackup: String,
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

export const MongoUser = model<UserDocument>('User', UserSchema, 'users')
