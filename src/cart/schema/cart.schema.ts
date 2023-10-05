import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  SchemaTypes, Types } from "mongoose";
import {User} from 'src/auth/schemas/user.schema'
import { Product } from "src/product/schema/product.schema";


@Schema({
    timestamps:{
        createdAt:"created_at",
        updatedAt:'updated_at'
    }
})
export class Cart{
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

export const cartSchema=SchemaFactory.createForClass(Cart)