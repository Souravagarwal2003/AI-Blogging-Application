import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, enum: ['free', 'premium'], default: 'free' },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  isActive: { type: Boolean, default: true },
});

export default mongoose.model('Subscription', subscriptionSchema);