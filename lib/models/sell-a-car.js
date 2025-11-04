import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    authorize: { type: Boolean, required: true },
    formType: { type: String, default: 'sell' },
  },
  { timestamps: true }
);

const Sellcar = mongoose.models.sellcar || mongoose.model('sellcar', Schema);
export default Sellcar;
