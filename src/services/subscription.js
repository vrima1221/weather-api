import Subscription from '../models/Subscription.js';
import User from '../models/User.js';

export const createSubscription = async (data) => {
  return await Subscription.create(data);
};

export const getSubscriptionByToken = async (token) => {
  return await Subscription.findOne({ where: { token}, include: User });
};

export const getAllSubscriptionsByFrequency = async (frequency) => {
  return await Subscription.findAll({
    where: { frequency },
    include: { model: User, where: { confirmed: true } },
  });
};
