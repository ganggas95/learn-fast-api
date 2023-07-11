import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/create-login.dto';
import { UserService } from 'src/user/user.service';
import { verifyPassword } from 'src/utils/password-utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(loginDto.username);
    if (!user)
      throw new UnauthorizedException({
        username: `User with ${loginDto.username} not found`,
      });
    const validPassword = await verifyPassword(
      loginDto.password,
      user?.password,
    );
    if (validPassword) {
      const payload = { sub: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException({
      username: [`Invalid username and password combination`],
      password: [`Invalid username and password combination`],
    });
  }
}
