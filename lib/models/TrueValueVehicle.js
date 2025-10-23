import mongoose from 'mongoose';

const trueValueVehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    modelYear: Number,
    price: Number,
    kmDriven: Number,
    fuelType: String,
    transmission: String,
    bodyType: String,
    color: String,
    userType: String,
    location: String,
    image: String, // Primary image
    features: [String],
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.TrueValueVehicle ||
  mongoose.model('TrueValueVehicle', trueValueVehicleSchema);
