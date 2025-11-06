import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: {
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

const Service =
  mongoose.models.service || mongoose.model('service', serviceSchema);
export default Service;
