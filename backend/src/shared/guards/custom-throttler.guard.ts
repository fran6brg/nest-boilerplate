import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class customThrottlerGuard extends ThrottlerGuard {
  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const ip = client.conn?.remoteAddress;
	const req = context.switchToHttp().getRequest();
	const { path, rawHeaders, body, query, params } = req;
    const key = this.generateKey(context, ip);
    const ttls = await this.storageService.getRecord(key);

    console.log('2.a customThrottlerGuard | rawHeaders:', rawHeaders.map((value: string, index: number) => index % 2 ? '' : `${value}: ${rawHeaders[index + 1]}`).filter(Boolean), '| path:', path, "| query:", query, "| params:", params, "| body:", body);
    console.log('2.b customThrottlerGuard | ttls.length:', ttls.length, '| limit:', limit);

    if (ttls.length >= limit) {
      throw new ThrottlerException();
    }

    await this.storageService.addRecord(key, ttl);
    return true;
  }
}
