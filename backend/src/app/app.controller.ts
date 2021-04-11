import { Controller, Get, Request, UseGuards } from '@nestjs/common';
// Service
import { AuthService } from '../auth/auth.service';
import { AppService } from './app.service';
// Auth
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   *
   * @param req
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('app.controller | getProfile | req.user:', req.user);
    return req.user;
  }
}
