// Nest
import { Module } from '@nestjs/common';
// Modules
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// Services
import { AuthService } from './auth.service';
// Controllers
import { AuthController } from './auth.controller';
// Strategies
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    /**
     * Imports modules
     */
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            // By importing the same secret used when we signed the JWT,
            // we ensure that the verify phase performed by Passport, and the sign phase performed in our AuthService, use a common secret
            secret: `${process.env.AUTH_SECRET}`,

            // Configure the JWT to have an expiration of 600 seconds
            signOptions: { expiresIn: '600s' },
          }),
    ],

    /**
     * Declare controllers
     */
    controllers: [AuthController],

     /**
     * Declare services
     */
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],

    /**
     * Exports services
     */
    exports: [AuthService],
})
export class AuthModule {
}
