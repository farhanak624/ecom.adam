
import { IsNotEmpty,IsString, IsNumber, Validator, IsOptional, IsPositive, Validate } from "class-validator";
import { Transform } from 'class-transformer';
import { PartialType } from "@nestjs/mapped-types";
import { IsPriceValidConstraint } from "./price.validate.dto";
import { IsImageFileConstraint } from "./image.validate.dto";


export class ProductDto{
 
    @IsNotEmpty()
    @IsString()
    productName:string

    @IsNotEmpty()
    @IsString()
     modelName:string

    @IsNotEmpty()
    @IsString()
    specification:string

    @IsNotEmpty()
    @IsString()
     color:string
 
    @IsNotEmpty()
    @Validate(IsPriceValidConstraint)
    price:number

    @IsOptional()
    @Validate(IsImageFileConstraint)
    @IsNotEmpty()
    image:Express.Multer.File
}