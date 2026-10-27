import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';

import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService){}

    async register(registerDto: RegisterDto){
        const userExist = await this.userService.findByEmail(registerDto.email)
        if(userExist){
            throw new ConflictException(`Cette adresse e-mail est déjà utilisée.`)
        }

        const passwordHashed = await argon2.hash(registerDto.password)

        const user = await this.userService.create({
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            email: registerDto.email,
            passwordHash: passwordHashed
        })

        const { passwordHash, ...result } = user

        return result
    }

    async login(loginDto: LoginDto){
        const user = await this.userService.findByEmail(loginDto.email)
        const messageErreur = `Email ou mot de passe incorrect`
        if(!user){
            throw new UnauthorizedException(messageErreur)
        }

        const passwordMatch = await argon2.verify(user.passwordHash, loginDto.password)
        if(!passwordMatch){
            throw new UnauthorizedException(messageErreur)
        }

        return {
            message: `Connexion réussie`
        }
    }
}
