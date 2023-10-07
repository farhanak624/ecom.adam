import { HttpException, HttpStatus } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";


export class IsPriceValidConstraint implements ValidatorConstraintInterface{
    validate(price:any):boolean{
        return !isNaN(parseFloat(price)) && isFinite(price) && price!=='';
    }
    defaultMessage(): string {
         throw new HttpException('price must be a number', HttpStatus.FORBIDDEN)
    }
}