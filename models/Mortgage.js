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
  purchasePrice: {
    type: Number
  },
  principal: {
    type: Number
  },
  interest: {
    type: Number
  },
  term: {
    type: Number,
  },
  paymentsMade: {
    type: Number
  },
  bank: {
    type: String
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