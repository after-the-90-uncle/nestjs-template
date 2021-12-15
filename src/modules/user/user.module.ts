import { Module ,MiddlewareConsumer} from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import User from "./user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import {CacheService} from "@src/common/cache/cache.service";
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,CacheService],
})
export default class UserModule {
    
}
