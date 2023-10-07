import { IsNotEmpty,IsString,IsEmail,MinLength, IsBoolean } from "class-validator";


export class AdminActionDto{
 
    @IsNotEmpty()
    @IsString()
    id:string
}