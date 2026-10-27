import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('create')
    create(@Body() registerDto: RegisterDto){
        return this.authService.register(registerDto)
    }

    @Post('login')
    login(@Body() logindDto: LoginDto){
        return this.authService.login(logindDto)
    }
}
