import mongoose from 'mongoose';

const AccessoryOrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  product: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.AccessoryOrder ||
  mongoose.model('AccessoryOrder', AccessoryOrderSchema);
