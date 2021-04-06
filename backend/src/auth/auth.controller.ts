import {
    Controller,
    Get, Post, Put, Delete,
    Body, Request, Res, Param, UseGuards,
    Inject, Logger, LoggerService
} from '@nestjs/common';
// Auth
import { AuthService } from './auth.service';
// Auth related
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

  /**
   * version with AuthGuard:
   * Using an AuthGuard that @nestjs/passport automatically provisioned for us
   * when we extended the passport-local strategy (Passport local strategy has
   * a default name of 'local': /src/auth/local.strategy.ts)
   *
   * version with LocalAuthGuard:
   * ?.
   *
   * @param req
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log("auth.controller | login | req.user:", req.user);
    // return req.user;
    return this.authService.login(req.user);
  }
}
