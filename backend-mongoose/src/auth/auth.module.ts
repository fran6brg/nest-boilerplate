// Nest
import { Module } from '@nestjs/common';
// Users
import { UsersModule } from 'src/users/users.module';
// Auth
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// Auth related
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
// import { jwtConstants } from './constants';

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
