import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {Injectable} from '@nestjs/common'
import { Role } from "../interface/user.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            Expiration:process.env.JWT_EXPIRES,
            secretOrKey:process.env.JWT_SECRET
        })
    }
    
    async validate(payload){
        console.log("payload is",payload);
    return{
        userId:payload.id,
        // userName:payload.username,
        role:payload.role,
    }
    
    }
}

