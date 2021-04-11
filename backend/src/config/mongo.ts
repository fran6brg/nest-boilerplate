import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
	URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/",
	DB_NAME: process.env.MONGODB_DB_NAME || "nest",
  }));