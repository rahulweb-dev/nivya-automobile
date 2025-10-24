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
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Usedcar = mongoose.models.usedcar || mongoose.model('usedcar', Schema);
export default Usedcar;
