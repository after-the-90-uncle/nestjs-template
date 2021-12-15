import { Controller, Get ,Param,Body,Query} from '@nestjs/common';
import AppService from './app.service';
import { ApiTags,ApiParam,ApiProperty,ApiQuery } from '@nestjs/swagger';
@ApiTags("测试")
@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiQuery({ name: 'name', description: '名字', type: "string" })
  getHello(@Query() query): string {
    return query.name;
  }
}
