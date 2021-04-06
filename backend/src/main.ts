import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
// import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: WinstonModule.createLogger({}) // https://github.com/gremo/nest-winston#use-as-the-main-nest-logger-also-for-bootstrapping
  });

  // Add '/api' before all routes
  // app.setGlobalPrefix("api");

  // Apply middlewares globally
  // app.use(new LoggerMiddleware(), new FormatDeepMiddleware()); // does not work cf. https://github.com/nestjs/nest/issues/543

  // Import configService
  const configService = app.get(ConfigService);

  // Launch app on API_PORT specified in config
  await app.listen(configService.get<number>("server.API_PORT")!);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`db address: ${process.env.MONGODB_URI}${process.env.MONGODB_DB_NAME}`);
}
bootstrap();
