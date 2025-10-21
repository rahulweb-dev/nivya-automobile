import mongoose from 'mongoose';

const AccessoryOrderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    customerPhone: { type: Number, required: true, trim: true },
    itemName: { type: String, required: true, trim: true },
    itemCode: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const AccessoryOrder =
  mongoose.models.AccessoryOrder ||
  mongoose.model('AccessoryOrder', AccessoryOrderSchema);

export default AccessoryOrder;
