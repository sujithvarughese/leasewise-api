import mongoose from "mongoose"

const PaymentSchema = new mongoose.Schema({
  account: {
    type: mongoose.Types.ObjectId,
    ref: "Account",
    required: true
  },
  unit: {
    type: [mongoose.Types.ObjectId],
    ref: "Unit",
    required: true
  },
  type: {
    type: String,
    enum: ["recurring", "onetime"],
    required: true
  },
  category: {
    type: String,
    enum: ["tax", "insurance", "hoa", "maintenance", "repairs", "advertising", "appliances", "utilities", "other"],
    required: true
  },
  description: {
    type: String
  },
  payTo: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  dateDue: {
    type: Date,
    required: true
  },
  datePaid: {
    type: Date,
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
}, { timestamps: true })

export default mongoose.model("Payment", PaymentSchema)