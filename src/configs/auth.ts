import 'dotenv/config';

export default {
  secret: process.env.JWT_KEY || 'default',
  expiresIn: '365d',
};
