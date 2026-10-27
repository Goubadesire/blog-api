import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService){}

    async findByEmail(email: string){
        return this.prismaService.user.findUnique({
            where: { email: email }
        })
    }

    async create(data: Prisma.UserCreateInput){
        return this.prismaService.user.create({data})
    }
}
