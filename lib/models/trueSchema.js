import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    ownerType: { type: String, required: true },
    fuelType: { type: String, required: true },
    modelYear: Number,
    price: Number,
    kmDriven: Number,
    fuelType: String,
    transmission: String,
    bodyType: String,
    color: String,
    userType: String,
    location: String,
    images: [
      {
        url: String,
        fileId: String,
        primary: { type: Boolean, default: false },
      },
    ],

    features: [String],
    description: String,
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Rajesh ||
  mongoose.model("Rajesh", vehicleSchema);
