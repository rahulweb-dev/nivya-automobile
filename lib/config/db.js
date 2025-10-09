import mongoose from 'mongoose';

export const ConnectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('✅ MongoDB already connected');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    throw new Error('Database connection failed');
  }
};
