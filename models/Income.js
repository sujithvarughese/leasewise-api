import mongoose from 'mongoose'

const IncomeSchema = new mongoose.Schema({
  account: {
    type: mongoose.Types.ObjectId,
    ref: "Account"
  },
  unit: {
    type: mongoose.Types.ObjectId,
    ref: "Unit",
    required: true,
  },
  category: {
    type: String,
    enum: ["rent", "deposit", "other"],
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  balance: {
    type: Number,
    required: true,
  },
  datePaid: {
    type: Date,
    required: true
  },
  paymentMethod: {
    type: String,
  },
  notes: {
    type: String
  }
})

export default mongoose.model("Income", IncomeSchema)