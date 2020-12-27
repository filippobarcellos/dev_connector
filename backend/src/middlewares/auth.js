import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json(401).json({ error: 'Token was not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.jwtSecret);
    req.user = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token provided is not valid' });
  }
};
