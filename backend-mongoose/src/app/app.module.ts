// App
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Modules
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
// Config
import mongoConfig from '../config/mongo';
import serverConfig from '../config/server';
// Db modules
import { AuthModule } from '../auth/auth.module';
import { ProgramsModule } from '../programs/programs.module';
// Middlewares
import { LoggerMiddleware } from '../middlewares/logger.middleware';
// import { FormatDeepMiddleware } from '../middlewares/formatDeep.middleware';
import { UsersModule } from '../users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  /**
   * Import modules
   */
  imports: [
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      load: [mongoConfig, serverConfig],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `${process.env.MONGODB_URI}${process.env.MONGODB_DB_NAME}`,
    ), // https://stackoverflow.com/questions/63376082/how-to-pass-configs-from-config-service-to-nest-js-decorator
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 1,
    }),
    AuthModule,
    UsersModule,
    AuthModule,
    ProgramsModule,
  ],

  /**
   * Declare controllers
   */
  controllers: [AppController],

  /**
   * Declare services
   */
  providers: [AppService],
})
export class AppModule implements NestModule {
  // https://docs.nestjs.com/middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware /*, FormatDeepMiddleware*/)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
