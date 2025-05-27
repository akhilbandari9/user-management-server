import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const data = await this.usersModel.find().exec();

    return data;
  }

  async findOne(id: number) {
    const data = await this.usersModel.findById(id).exec();
    return data;
  }

  async findUserByEmail(email: string) {
    const data = await this.usersModel
      .findOne({
        email: email,
      })
      .exec();
    if (!data) {
      throw new UnauthorizedException(`User with email ${email} not found`);
    }
    return data;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
