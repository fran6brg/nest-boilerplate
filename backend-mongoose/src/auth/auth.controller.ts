import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Request,
  Res,
  Param,
  UseGuards,
  Inject,
  Logger,
  LoggerService,
  UseInterceptors,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { customThrottlerGuard } from 'src/shared/guards/custom-throttler.guard';

// Service
import { AuthService } from './auth.service';

// Authentication
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
  //   @UseGuards(ThrottlerGuard)
  @UseGuards(customThrottlerGuard)
  @Post('login')
  async login(@Request() req) {
    console.log('auth.controller | login | req.user:', req.user);
    // console.log('auth.controller | login | req.session:', req.session);
    // req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
    // console.log('auth.controller | login | req.session:', req.session);
    return this.authService.login(req.user);
  }
}
