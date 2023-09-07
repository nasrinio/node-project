import mongoose, { Schema } from 'mongoose'

const msgSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      lowercase: true,
    },
    sendTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

export const msgModel = mongoose.model('Message', msgSchema)
