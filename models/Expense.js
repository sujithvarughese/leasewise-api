import mongoose from "mongoose"

const ExpenseSchema = new mongoose.Schema({
  unit: {
    type: mongoose.Types.ObjectId,
    ref: "Unit",
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
  paymentMethod: {
    type: String
  },
  companyName: {
    type: String,
  },
  companyAddress: {
    type: String,
  },
  companyPhone: {
    type: String
  },
  companyEmail: {
    type: String
  },
  companyAgent: {
    type: String
  },
  receipt: {
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
}, { timestamps: true })

export default mongoose.model("Expense", ExpenseSchema)