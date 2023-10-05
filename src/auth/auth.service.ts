import { Injectable, MisdirectedException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService:JwtService
    ){}

    async UserRegister(signUpDto:SignupDto){
        
        const {name,username,email,password,role} = signUpDto

        const checkUser= await this.userModel.findOne({email})

        if(checkUser){
            throw new MisdirectedException('User already exist')
        }

        const hashedPassword= await bcrypt.hash(password,10)
        const user =await this.userModel.create({
            name,
            username,
            email,
            password:hashedPassword,
            role,
        })
        await user.save()
        // const token = this.jwtService.sign({ id:user._id, role:user.role}) //token gennerating with user id payload
        // console.log(token);
     return "User Registered "
    }
   
    async validateUser(loginDto:LoginDto) {
        const {username,password}=loginDto ;
        const userDetails =await this.userModel.findOne({
            username,
        })
        const IsPasswordCorrect= await bcrypt.compare(password,userDetails.password)
        // console.log("from auth service",userDetails);
        if(!userDetails) {
            throw new UnauthorizedException('User Not found')
        }
        if(!IsPasswordCorrect){
            throw new UnauthorizedException('Incorrect password')
        }
        
        const token = jwt.sign({id:userDetails._id , role:userDetails.role },process.env.JWT_SECRET) //token gennerating with user id payload
        
        return {token}
    }
}
