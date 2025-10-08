import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const mongoDBUrl =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/designerPortfolio';

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
const jwtExpires = process.env.JWT_EXPIRES || '7d';

export const ENV = {
  port,
  mongoDBUrl,
  jwtExpires,
  jwtSecret,
};
