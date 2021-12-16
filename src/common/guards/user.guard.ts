// user.guard.ts
import { CanActivate, ExecutionContext, Injectable ,HttpException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {CacheService} from "@src/common/cache/cache.service";
@Injectable()
export class UserGuard implements CanActivate {
    constructor(private readonly cache: CacheService) {}
    async canActivate(ctx: ExecutionContext): Promise<boolean>  {
        const req = ctx.switchToHttp().getRequest<Request|any>();
        const token = req.session.get("sessionid");
        if(!token) {
            throw new HttpException("用户未登录",401)
        }
        const session = await this.cache.get(token);
        if(!session) {
            req.session.delete("sessionid")
            throw new HttpException("登录已失效",401)
        }
        req.user = session;
        return true;
    }
}
