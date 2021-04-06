import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        // private configService: ConfigService,
    ) {
    // Strategy initialization. See options here https://github.com/mikenicholson/passport-jwt#configure-strategy
    super({
        // the method by which the JWT will be extracted from the Request
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

        // If our route is supplied with an expired JWT, the request will be denied and a 401 Unauthorized response sent
        ignoreExpiration: false,

        // expedient option of supplying a symmetric secret for signing the token. Do not expose this secret publicly.
        secretOrKey: "secret",
        // secretOrKey: process.env.AUTH_SECRET,
        // secretOrKey: this.configService.get<string>('auth.SECRET'); // does not work
    });
    }

    /**
     * Handler to ?.
     * @param payload - ?.
     * @returns object - object containing the userId and username properties.
     */
    async validate(payload: any) {
        console.log("jwt.strategy | validate | payload:", payload);
        // business logic goes here
        // for example: database lookup in our validate() method to extract more information about the user, resulting in a more enriched user object being available in our Request
        // this is also the place we may decide to do further token validation, such as looking up the userId in a list of revoked tokens, enabling us to perform token revocation
        return { userId: payload.sub, username: payload.username };
    }
}