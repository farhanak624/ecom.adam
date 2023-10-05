import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';
import { LocalStrategy } from '../auth/strategies/local.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({ //for register jwt
      inject:[ConfigService], // env throw undifined without this
      useFactory:(config:ConfigService)=>{
        return {
          secret:config.get<string>('JWT_SECRET'),
          signOptions:{
            expiresIn:config.get<string | number>('JWT_EXPIRES')
          }
        } 
      }
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy]
})
export class AuthModule {}
