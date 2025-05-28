import {
  Injectable,
  NotAcceptableException,
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

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersModel
      .findOne({
        email: createUserDto.email,
      })
      .exec();
    if (existingUser) {
      throw new NotAcceptableException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    const user = new this.usersModel(createUserDto);
    const data = await user.save();
    return data;
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = this.usersModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const updatedUser = await this.usersModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
      })
      .exec();
    return updatedUser;
  }

  async remove(id: string) {
    const existingUser = this.usersModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.usersModel.findByIdAndDelete(id).exec();

    return {
      message: `User with id ${id} deleted successfully`,
    };
  }
}
