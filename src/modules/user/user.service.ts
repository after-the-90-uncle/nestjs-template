import { Injectable ,HttpException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from "./user.entity";
@Injectable()
export default class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}
    async findAll(): Promise<User[]> {
        // const client = await this.redisService.getClient("yj.passport:yj.ms.pt.admin3781");
        // throw new HttpException("哈11哈",403);
        return this.usersRepository.find();
    }
}
