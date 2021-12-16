import { Controller, Get ,UseGuards,Req, Res} from '@nestjs/common';
import UserService  from './user.service';
import { ApiTags,ApiParam,ApiProperty,ApiQuery } from '@nestjs/swagger';
import {CacheService} from "@src/common/cache/cache.service";
import {UserGuard} from "@src/common/guards/user.guard";
import {SessionGuard} from "@src/common/guards/session.guard";

@UseGuards(SessionGuard)
@ApiTags("测试")
@Controller("/user")
export default class UserController {
    constructor(
      private readonly userService: UserService,
      private readonly cache: CacheService,
    ) {}

    // @UseGuards(UserGuard)
    @Get("/list")
    async getAllUser(@Req() req,@Res({ passthrough: true }) response) {
        let a = await this.userService.findAll();
        let b = this.cache.get("yj.passport:yj.ms.pt.admin3781");
        req.session.set("sessionid","12123")
        response.setCookie("ddd","杜慧杰")
        console.log(response.setCookie)
        return {a};
    }
}
