import { Injectable, Request } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async getProfile(req) {
    const [type, token] = req.headers.authorization?.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new Error('Invalid authorization header');
    }

    const decodedToken = await this.jwtService.verifyAsync(token, {
      secret: JWT_SECRET,
    });

    const user = await this.userService.findOne(decodedToken?.sub);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findUserByEmail(signInDto.email);

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
