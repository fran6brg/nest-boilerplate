import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('auth.service | validateUser');
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === pass) {
      // Return the user object without password key
      const result = {
        age: user.age,
        username: user.username,
      };
      console.log(
        'auth.service | validateUser | password:',
        user.password,
        '| result:',
        result,
      );

      return result;
    }

    console.log('auth.service | validateUser | no user found');
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.age };
    console.log('auth.service | login | payload:', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
