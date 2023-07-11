import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/create-login.dto';

@Controller('api/v1/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  login(@Body() createLoginDto: LoginDto) {
    return this.loginService.login(createLoginDto);
  }
}
