import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

import User from '../models/User';

exports.createSession = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: 'User or password does not match' });
  }

  if (!(await user.checkPassword(password))) {
    return res.status(401).json({ error: 'User or password does not match' });
  }

  const { id, name } = user;

  return res.json({
    user: {
      id,
      name,
      email,
    },
    token: jwt.sign({ id }, authConfig.jwtSecret, {
      expiresIn: authConfig.expiresIn,
    }),
  });
};
