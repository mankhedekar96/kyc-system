export default {
  secret: process.env.JWT_SECRET || 'your_default_secret',
  expiresIn: '1h',
};
