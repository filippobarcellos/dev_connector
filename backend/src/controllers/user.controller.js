import gravatar from 'gravatar';

import User from '../models/User';

// @route   POST /users
// @desc    Create a user
// @acess   Public

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    user = new User({
      name,
      email,
      password,
      avatar,
    });

    await user.save();

    return res.json({
      id: user.id,
      name,
      email,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};
