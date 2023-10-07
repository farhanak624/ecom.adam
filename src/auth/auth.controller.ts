import { Controller, Post, Body, Get, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { Public } from './decorator/public.decorator';
import { GetUser } from './decorator/get.user.decorator';
import { User } from './schemas/user.schema';
import { Roles } from './decorator/roles.decorator';
import { Role } from './interface/user.interface';
import { RoleGuard } from './role/role.guard';
import { AdminActionDto } from './dto/admin.action.dto';

@Controller('user')
export class AuthController {
  constructor(
    private authService: AuthService,
    private localService: LocalStrategy,
  ) {}

  @Public()
  @Post('/signup')
  signUp(@Body() signupDto: SignupDto) {
    return this.authService.UserRegister(signupDto);
  }

  // @Roles('user')
  // @UseGuards(RoleGuard)

  @Public()
  @Post('/login')
  login(@Body() loginDto: LoginDto,@GetUser() user): Promise<{ token: string }> {
    console.log("sjkdh",user); 
    return this.localService.validateStrat(loginDto);
  }

  @Post('adminaction')
  adminAction(@Body() adminAction:AdminActionDto){
    return this.authService.adminAssign(adminAction)
  }
}