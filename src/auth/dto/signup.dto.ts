import { IsNotEmpty,IsString,IsEmail,MinLength } from "class-validator";



export class SignupDto{
    @IsNotEmpty()
    @IsString()
    readonly name:string

    @IsNotEmpty({})
    @IsString()
    readonly username:string

    @IsNotEmpty()
    @IsEmail({},{message:"Please enter a valid email"})
    readonly email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(5,{message:"minimum 5 character required for password"})
    readonly password:string

    readonly role:string;
}