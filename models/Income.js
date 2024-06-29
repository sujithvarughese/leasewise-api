import mongoose from 'mongoose'

const RentPaymentSchema = new mongoose.Schema({
  account: {
    type: mongoose.Types.ObjectId,
    ref: "Account"
  },
  unit: {
    type: mongoose.Types.ObjectId,
    ref: "Unit"
  },
  type: {
    type: String,
    enum: ["rent", "deposit", "other"]
  },
  amount: {
    type: Number,
    required: true
  },
  balance: {
    type: Number
  },
  datePaid: {
    type: Date,
    required: true
  },
  paidBy: {
    type: String,
  },
  notes: {
    type: String
  }
})

export default mongoose.model("RentPayment", RentPaymentSchema)