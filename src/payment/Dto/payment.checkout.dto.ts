import { Prop } from "@nestjs/mongoose";
import { IsNumber, IsOptional, IsString, } from "class-validator";
import { SchemaTypes, Types } from "mongoose";
import { User } from "src/auth/schemas/user.schema";
import { Product } from "src/product/schema/product.schema";


export class PaymentCheckoutDto {
    @Prop({ type: SchemaTypes.ObjectId, ref :User.name})
    userId: Types.ObjectId;

    @Prop([
        {count: { type:Number, required:true },
        product_id: { type:SchemaTypes.ObjectId, ref:Product.name}}
    ])
    products:Array<{
        count:number;
        product_id:Types.ObjectId;
    }>;
  }