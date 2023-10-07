import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {Injectable} from '@nestjs/common'
import { Role } from "../interface/user.interface";
import { ConfigService } from "@nestjs/config";

export type JwtPayload={
    sub:string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor( private configService:ConfigService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            Expiration:process.env.JWT_EXPIRES,
            secretOrKey:process.env.JWT_SECRET
        })
    }
    
    validate(payload:JwtPayload){
     
     
        return payload
    // {
    //     userId:payload.id,
    //     // userName:payload.username,
    //     role:payload.role,
    // }
    
    }
}

