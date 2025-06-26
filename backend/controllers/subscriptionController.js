import Subscription from '../models/Subscription.js';
import User from '../models/User.js';

export const subscribe = async (req, res) => {
  const { plan } = req.body;
  if (!['free', 'premium'].includes(plan)) {
    return res.status(400).json({ message: 'Invalid plan' });
  }
  try {
    let subscription = await Subscription.findOne({ user: req.user._id });
    if (subscription) {
      subscription.plan = plan;
      subscription.startDate = new Date();
      subscription.isActive = true;
      subscription.endDate = plan === 'premium' ? new Date(Date.now() + 30*24*60*60*1000) : null;
      await subscription.save();
    } else {
      subscription = await Subscription.create({
        user: req.user._id,
        plan,
        startDate: new Date(),
        endDate: plan === 'premium' ? new Date(Date.now() + 30*24*60*60*1000) : null,
        isActive: true,
      });
    }

    // Update user's plan
    const user = await User.findById(req.user._id);
    user.subscription = plan;
    await user.save();

    res.json({ message: `Subscribed to ${plan} plan successfully`, subscription });
  } catch (error) {
    res.status(500).json({ message: 'Subscription failed' });
  }
};