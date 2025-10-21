import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  fileName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
