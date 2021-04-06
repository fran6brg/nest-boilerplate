import { Injectable, NestMiddleware } from '@nestjs/common';

/**
 * This middleware assess if request should be considered as admin.
 *
 * @param {object} req - Express request.
 * @param {object} res - Express response.
 * @param {Function} next - Express function to call the next middleware/route.
 * @returns {*} - Unauthorized or next.
 */
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
// 	// constructor(private dbConfig: ConfigType<typeof databaseConfig>) {}
// 	constructor(private configService: ConfigService) {}
// 	use(req: any, res: any, next: () => void) {
// 		try {
// 			// Retrieve token from authorization header
// 			const { authorization } = req.headers;

// 			// Retrieve token from authorization header
// 			const [, token] = authorization.split(" ");

// 			const clientSecret = this.configService.get<string>('server.CLIENT_SECRET');

// 			// Validate token
// 			if (Buffer.from(token, "base64").toString() !== clientSecret)
// 				return res.unauthorized();

// 			return next();
// 		}
// 		catch (error) {
// 			return res.unauthorized();
// 		}
// 	}
// }
