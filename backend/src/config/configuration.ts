import { ConfigFactory } from '@nestjs/config/dist/interfaces';
import { config } from 'dotenv';
import { Configuration } from './configuration.interface';

const int = (val: string | undefined, num: number): number =>
  val ? (isNaN(parseInt(val)) ? num : parseInt(val)) : num;
const bool = (val: string | undefined, bool: boolean): boolean =>
  val == null ? bool : val == 'true';

const configuration: Configuration = {
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  meta: {
    appName: process.env.APP_NAME ?? 'Staart',
    domainVerificationFile:
      process.env.DOMAIN_VERIFICATION_FILE ?? 'staart-verify.txt',
  },
  rateLimit: {
    public: {
      points: int(process.env.RATE_LIMIT_PUBLIC_POINTS, 250),
      duration: int(process.env.RATE_LIMIT_PUBLIC_DURATION, 3600),
    },
    authenticated: {
      points: int(process.env.RATE_LIMIT_AUTHENTICATED_POINTS, 5000),
      duration: int(process.env.RATE_LIMIT_AUTHENTICATED_DURATION, 3600),
    },
    apiKey: {
      points: int(process.env.RATE_LIMIT_API_KEY_POINTS, 10000),
      duration: int(process.env.RATE_LIMIT_API_KEY_DURATION, 3600),
    },
  },
  caching: {
    geolocationLruSize: int(process.env.GEOLOCATION_LRU_SIZE, 100),
    apiKeyLruSize: int(process.env.API_KEY_LRU_SIZE, 100),
  },
  security: {
    saltRounds: int(process.env.SALT_ROUNDS, 10),
    jwtSecret: process.env.JWT_SECRET ?? 'staart',
    totpWindowPast: int(process.env.TOTP_WINDOW_PAST, 1),
    totpWindowFuture: int(process.env.TOTP_WINDOW_FUTURE, 0),
    mfaTokenExpiry: process.env.MFA_TOKEN_EXPIRY ?? '10m',
    mergeUsersTokenExpiry: process.env.MERGE_USERS_TOKEN_EXPIRY ?? '30m',
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY ?? '1h',
    passwordPwnedCheck: bool(process.env.PASSWORD_PWNED_CHECK, true),
    unusedRefreshTokenExpiryDays: int(process.env.DELETE_EXPIRED_SESSIONS, 30),
    inactiveUserDeleteDays: int(process.env.INACTIVE_USER_DELETE_DAYS, 30),
  },
  email: {
    name: process.env.EMAIL_NAME ?? 'Staart',
    from: process.env.EMAIL_FROM ?? '',
    retries: int(process.env.EMAIL_FAIL_RETRIES, 3),
    ses: {
      accessKeyId: process.env.EMAIL_SES_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.EMAIL_SES_SECRET_ACCESS_KEY ?? '',
      region: process.env.EMAIL_SES_REGION ?? '',
    },
    transport: {
      host: process.env.EMAIL_HOST ?? '',
      port: int(process.env.EMAIL_PORT, 587),
      secure: bool(process.env.EMAIL_SECURE, false),
      auth: {
        user: process.env.EMAIL_USER ?? process.env.EMAIL_FROM ?? '',
        pass: process.env.EMAIL_PASSWORD ?? '',
      },
    },
  },
  webhooks: {
    retries: int(process.env.WEBHOOK_FAIL_RETRIES, 3),
  },
  tracking: {
    mode:
      (process.env.TRACKING_MODE as Configuration['tracking']['mode']) ??
      'api-key',
    index: process.env.TRACKING_INDEX ?? 'staart-logs',
    deleteOldLogs: bool(process.env.TRACKING_DELETE_OLD_LOGS, true),
    deleteOldLogsDays: int(process.env.TRACKING_DELETE_OLD_LOGS_DAYS, 90),
  },
  mongo: {
	uri: process.env.MONGO_URI,
	dbName: process.env.MONGO_DBNAME,
	auth: {
		user: process.env.MONGO_USER,
		password: process.env.MONGO_PASSWORD,
	},
	authSource: process.env.MONGO_AUTH_SOURCE,
	useUnifiedTopology: bool(process.env.MONGO_USE_UNIFIED_TOPOLOGY, true),
	useNewUrlParser: bool(process.env.MONGO_USE_NEW_URL_PARSER, true),
  },
  server: {
	mode: process.env.SERVER_MODE,
	env: process.env.SERVER_ENV,
	isProduction: bool(process.env.SERVER_IS_PRODUCTION, false),
	apiPort: int(process.env.SERVER_API_PORT, 3000),
	corsWhitelist: process.env.SERVER_CORS_WHITELIST,
	fileMaxSize: int(process.env.SERVER_FILE_MAX_SIZE, 1024 * 1024 * 5),
	clientSecret: process.env.SERVER_CLIENT_SECRET,
	allowedHtmlTags: [process.env.SERVER_ALLOWED_HTML_TAGS],
  },
};

const configFunction: ConfigFactory<Configuration> = () => configuration;
export default configFunction;
