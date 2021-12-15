// user.guard.ts
import { CanActivate, ExecutionContext, Injectable ,HttpException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {CacheService} from "@src/common/cache/cache.service";
@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private readonly cache: CacheService) {}
    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = ctx.switchToHttp().getRequest<Request|any>();
        const token = req.session.get("sessionid");
        if(!token) {
            return true
        }
        const session = this.cache.get(token);
        if(!session) {
            return true
        }
        req.user = session;
        return true;
    }
}
