import { Controller, Get,Param, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { Role } from 'src/auth/interface/user.interface';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){ }

    @Get(':id')
    viewProfile(
    @Param('id') id:string 
    ){
        return this.userService.viewProfile(id)
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard,RoleGuard) 
    @Get()
    test(@Request() req):any{
    return req.user;
    }
}