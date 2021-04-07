import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`\nLoggerMiddleware | req.url: ${req.url} | req.params: ${JSON.stringify(req.params)}`);
    next();
  }
}
