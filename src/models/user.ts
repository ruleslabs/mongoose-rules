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
  twitterUsername?: string
  instagramUsername?: string
  discordId?: string
  isDiscordVisible: boolean
}

export interface User {
  createdAt: Date
  username: string
  slug: string
  email: string
  password: string
  paymentMethodFingerprints: string[]
  starknetAddress?: string
  starknetPub?: string
  showcasedDeck: DeckCard[]
  refreshTokens: string[]
  profile: UserProfile
  rulesPrivateKey?: RulesPrivateKey
  packsBalances: PackBalance[]
  acceptCommercialEmails: boolean
  searchedUserIds: Types.ObjectId[]
  needsSignerPublicKeyUpdate: boolean
  signerEscapeTriggeredAt: Date
  discordRoles: string[]
  deployingStarknetAccount: boolean
  triggeringSignerEscape: boolean
  escapingSigner: boolean
}

export interface UserDocument extends User, Document {}
export interface UserProfileDocument extends UserProfile, Document {}

const UserProfileSchema = new Schema<UserProfileDocument>({
  avatarId: Number,
  certified: {
    type: Boolean,
    required: true,
  },
  twitterUsername: String,
  instagramUsername: String,
  discordId: String,
  isDiscordVisible: {
    type: Boolean,
    default: false,
  },
})

const UserSchema = new Schema<UserDocument>({
  createdAt: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
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
  starknetAddress: {
    type: String,
    index: true,
  },
  starknetPub: String,
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
  acceptCommercialEmails: {
    type: Boolean,
    required: true,
  },
  searchedUserIds: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    default: [],
  },
  needsSignerPublicKeyUpdate: {
    type: Boolean,
    default: false,
  },
  signerEscapeTriggeredAt: {
    type: Date,
  },
  discordRoles: {
    type: [String],
    default: [],
  },
  deployingStarknetAccount: {
    type: Boolean,
    default: false,
  },
  triggeringSignerEscape: {
    type: Boolean,
    default: false,
  },
  escapingSigner: {
    type: Boolean,
    default: false,
  },
})

UserSchema.index({ slug: 1, email: 1, starknetAddress: 1 })

export const MongoUser = model<UserDocument>('User', UserSchema, 'users')
