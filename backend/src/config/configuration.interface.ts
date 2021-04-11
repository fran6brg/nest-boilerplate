export interface Configuration {
  frontendUrl: string;

  meta: {
    appName: string;
    domainVerificationFile: string;
  };

  caching: {
    geolocationLruSize: number;
    apiKeyLruSize: number;
  };

  rateLimit: {
    public: { points: number; duration: number };
    authenticated: { points: number; duration: number };
    apiKey: { points: number; duration: number };
  };

  security: {
    saltRounds: number;
    jwtSecret: string;
    totpWindowPast: number;
    totpWindowFuture: number;
    mfaTokenExpiry: string;
    mergeUsersTokenExpiry: string;
    accessTokenExpiry: string;
    passwordPwnedCheck: boolean;
    unusedRefreshTokenExpiryDays: number;
    inactiveUserDeleteDays: number;
  };

  email: {
    name: string;
    from: string;
    retries: number;
    ses?: {
      accessKeyId: string;
      secretAccessKey: string;
      region: string;
    };
    transport?: {
      host: string;
      port: number;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    };
  };

  webhooks: {
    retries: number;
  };

  tracking: {
    mode: 'all' | 'api-key' | 'user' | 'api-key-or-user';
    index: string;
    deleteOldLogs: boolean;
    deleteOldLogsDays: number;
  };

  mongo: {
	uri: string;
	dbName: string;
	auth: {
		user: string,
		password: string,
	},
	authSource: string,
	useUnifiedTopology: boolean,
	useNewUrlParser: boolean,
  };

  server: {
	mode: string;
	env: string;
	isProduction: boolean;
	apiPort: number;
	corsWhitelist: string;
	fileMaxSize: number;
	clientSecret: string;
	allowedHtmlTags: [string];
  };
}
