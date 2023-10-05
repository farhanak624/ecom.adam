import { IsNotEmpty,IsString,IsEmail,MinLength } from "class-validator";


export class LoginDto{
 
    @IsNotEmpty()
    @IsString()
    readonly username:string

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    readonly password:string

    
    readonly role:string
}