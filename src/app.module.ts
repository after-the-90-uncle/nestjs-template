import { Module,MiddlewareConsumer } from '@nestjs/common';
import AppController  from './app.controller';
import AppService from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserModule from "./modules/user/user.module";
import { RedisModule} from 'nestjs-redis'
import { APP_FILTER } from '@nestjs/core';
import {HttpExceptionFilter} from "@src/common/filters/http-exception.filter";
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
      extra: {
        connectionLimit:  10, // 连接池最大连接数量, 查阅资料 建议是  core number  * 2 + n 
      },
    }),
    RedisModule.register({
      url:"redis://127.0.0.1:6379"
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService
  ],
})
export default class AppModule {
  
}
