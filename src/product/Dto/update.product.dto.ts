
import { IsNotEmpty,IsString, IsNumber, Validator, IsOptional, IsPositive, Validate } from "class-validator";
import { IsPriceValidConstraint } from "./price.validate.dto";
import { IsImageFileConstraint } from "./image.validate.dto";

export class UpdateProductDto{

    @IsOptional()
    @IsString()
    productName?:string

    @IsOptional()
    @IsString()
     modelName?:string

    @IsOptional()
    @IsString()
    specification?:string

    @IsOptional()
    @IsString()
    color?:string
 
    @IsOptional()
    @Validate(IsPriceValidConstraint)
    price?:number

    @IsOptional()
    @Validate(IsImageFileConstraint)
    @IsNotEmpty()
    image:Express.Multer.File

    
}