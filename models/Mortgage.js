import mongoose from 'mongoose'

const MortgageSchema = new mongoose.Schema({
  account: {
    type: mongoose.Types.ObjectId,
    ref: "Account"
  },
  unit: {
    type: mongoose.Types.ObjectId,
    ref: "Unit"
  },
  bank: {
    type: String,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  principal: {
    type: Number,
    required: true,
  },
  interest: {
    type: Number,
    required: true,
  },
  term: {
    type: Number,
    required: true,
  },
  numPaymentsMade: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  }
})

export default mongoose.model("Mortgage", MortgageSchema)