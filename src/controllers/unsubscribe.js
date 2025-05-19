import { getSubscriptionByToken } from "../services/subscription.js";

const unsubscribeUser = async (req, res) => {
  const token = req.params.token;

  try {
    const sub = await getSubscriptionByToken(token);
    if (sub) {
      await sub.destroy();
      res.send("Unsubscribed successfully.");
    } else {
      res.status(404).send("Invalid token");
    }
  } catch {
    res.status(500).send("Error unsubscribing");
  }
};

export default {
  unsubscribeUser,
};
