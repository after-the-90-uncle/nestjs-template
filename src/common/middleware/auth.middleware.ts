import { Injectable, NestMiddleware,Req,Res,HttpException } from '@nestjs/common';
import {FastifyRequest} from "fastify";
import {CacheService} from "@src/common/cache/cache.service";
@Injectable()
export class AuthMiddleware implements NestMiddleware<Request|any, Response> {
  constructor(private readonly cache: CacheService) {
  }
  async use(@Req() req: FastifyRequest, @Res() res, next: Function) {
    console.log(this.cache.get,"--req.cookies--",req.cookies)
    const token = req.cookies.sessionid;
    // if(!token) {
    //     // throw new HttpException("用户未登录",403)
    //     next()
    //     return
    // }
    // const session = await this.cache.get(token);
    // if(!session) {
    //     next()
    //     return
    // }
    // req.session = session;
    next();
  }
}
