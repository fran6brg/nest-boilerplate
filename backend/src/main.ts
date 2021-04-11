// Nest
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Security
import * as helmet from 'helmet';

// Module
import { AppModule } from './app/app.module';

// Interceptors
import { LoggingInterceptor } from './interceptors/duration.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

// Session
import * as session from 'express-session';

// Logs
// import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: WinstonModule.createLogger({}) // https://github.com/gremo/nest-winston#use-as-the-main-nest-logger-also-for-bootstrapping
  });

  // Add '/api' before all routes
  // app.setGlobalPrefix("api");

  /**
   * Security
   */
  app.use(helmet());
  app.enableCors();

  /**
   * Apply middlewares globally
   * Apply interceptors globally
   * Apply validation pipes globally
   */
  // app.use(new LoggerMiddleware()); // does not work cf. https://github.com/nestjs/nest/issues/543 ; https://docs.nestjs.com/middleware
  app.useGlobalInterceptors(new LoggingInterceptor(), new ErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  /**
   * HTTP sessions provide a way to store information about the user across multiple requests
   */
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  /**
   * Open API
   */
  // DocumentBuilder structure a base document that conforms to the OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Nest boilerplate')
    .setDescription('Testing Open API feature ...')
    .setVersion('1.0')
    .build();

  // Create a full document (with all HTTP routes defined)
  const document = SwaggerModule.createDocument(app, config);

  // Set endpoint to reach UI
  SwaggerModule.setup('api', app, document);

  /**
   * Config
   */
  const configService = app.get(ConfigService);

  /**
   * Launch app on API_PORT specified in config
   */
  await app.listen(configService.get<number>('server.API_PORT'));

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(
    `Mongodb is running on: ${process.env.MONGODB_URI}${process.env.MONGODB_DB_NAME}`,
  );
}
bootstrap();
