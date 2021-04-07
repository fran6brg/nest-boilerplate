import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
	MODE: process.env.MODE || "read",
	ENV: process.env.NODE_ENV || "development",
	IS_PRODUCTION: process.env.NODE_ENV === "production",
	API_PORT: process.env.API_PORT || 3000,
	CORS_WHITELIST: process.env.CORS_WHITELIST || /^http:\/\/(localhost|127\.0\.0\.1):\d{4}/u,
	FILE_MAX_SIZE: process.env.FILE_MAX_SIZE || 1024 * 1024 * 5,
	CLIENT_SECRET: process.env.ADM_CLIENT_SECRET || "random string",
	ALLOWED_HTML_TAGS: ["p", "a", "img", "strong", "em", "hr", "iframe", "ul", "ol", "li", "blockquote", "pre", "h1", "h2", "h3"],
  }));