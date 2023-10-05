import { IsNotEmpty, IsString } from "class-validator";


export class CreateCartDto {


    @IsNotEmpty()
    @IsString()
    userId:string
    
    @IsNotEmpty()
    @IsString()
    product_id:string

    

}
