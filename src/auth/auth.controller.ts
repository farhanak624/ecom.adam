import { Controller, Post,Body, Get, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { LocalStrategy } from '../auth/strategies/local.strategy';

@Controller('user')

export class AuthController {
     constructor( private authService:AuthService,
                private localService:LocalStrategy,){}


    @Post('/signup')
    signUp ( @Body(new ValidationPipe({ transform: true })) signupDto: SignupDto ){
    return this.authService.UserRegister(signupDto)
    }

    @Post('/login')
    login( @Body(new ValidationPipe({ transform: true })) loginDto:LoginDto): Promise<{token:string}>{
        return this.localService.validateStrat(loginDto)
    }

}
