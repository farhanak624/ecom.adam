
import { IsNotEmpty,IsString, IsNumber, Validator, IsOptional, IsPositive } from "class-validator";
import { Transform } from 'class-transformer';
import { PartialType } from "@nestjs/mapped-types";


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
    @IsNumber()
     price:number
 
    @IsNotEmpty()
    @IsString()
     image:string

}


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
    @IsNumber()
    @IsPositive()
    price?:number

    @IsOptional()
    @IsString()
    image?:string

    
}