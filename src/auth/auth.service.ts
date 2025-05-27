import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findUserByEmail(signInDto.email);
    console.log('User found:', user);

    const payload = {
      email: user.email,
      sub: user._id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
