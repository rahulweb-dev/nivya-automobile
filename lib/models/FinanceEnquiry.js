import mongoose from 'mongoose';

const FinanceEnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String },
    city: { type: String, required: true },
    comments: { type: String },
    model: { type: String, required: true },
    purchaseTime: { type: String },
    loanAmount: { type: Number, required: true },
    duration: { type: String },
  },
  { timestamps: true }
);

// Prevent model overwrite issues in dev mode
export default mongoose.models.FinanceEnquiry ||
  mongoose.model('FinanceEnquiry', FinanceEnquirySchema);
