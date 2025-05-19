import { getSubscriptionByToken } from "../services/subscription.js";

const confirmSubscription = async (req, res) => {
  try {
    const token = req.params.token;
    const sub = await getSubscriptionByToken(token)
    console.log(token);
    console.log(sub);

    if (!sub) {
      res.status(404).send("Invalid token");
    }

    sub.User.confirmed = true;
    await sub.User.save();
    res.send("Subscription confirmed.");
  } catch(err) {
    console.log(err);
    
    res.status(500).send("Error confirming subscription");
  }
};

export default {
  confirmSubscription
};
