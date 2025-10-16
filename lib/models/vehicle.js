import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vehicle =
  mongoose.models.vehicle || mongoose.model('vehicle', VehicleSchema);
export default Vehicle;
