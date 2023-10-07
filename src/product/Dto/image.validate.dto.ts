import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";

export class IsImageFileConstraint implements ValidatorConstraintInterface {
    validate(file:Express.Multer.File, args: ValidationArguments){
        if (!file){
            return false;
        }

        const allowedImageTypes =['image/jpeg','image/png','image/gif']
        if(allowedImageTypes.indexOf(file.mimetype)===-1){
            return false;
        }

    
    }
    defaultMessage(args:ValidationArguments){
        return 'invalid image file please upload Please upload a valid image (JPEG, PNG, GIF)'
    }

}