import crypto from 'crypto';
import { sendConfirmationEmail } from '../services/email.js';
import { createUser, getUserByEmail } from '../services/user.js';
import { createSubscription } from '../services/subscription.js';


const subscribeUser = async (req, res) => {
  const { email, city, frequency } = req.body;

  try {
    let user = await getUserByEmail(email);
    if (!user) user = await createUser({ email });
    
    const token = crypto.randomBytes(20).toString('hex');
    await createSubscription({ city, frequency, token, UserId: user.id });
    await sendConfirmationEmail(email, token);

    res.json({ message: 'Confirmation email sent' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Subscription failed' });
  }
};

export default { subscribeUser };