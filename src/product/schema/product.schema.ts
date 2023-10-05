import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";


@Schema({
  timestamps:true  
})

export class Product {

    @Prop() //can add multiple option (type, string)
    productName:string;

    @Prop()
    modelName:string;

    @Prop({ required:true})
    specification:string;

    @Prop()
    color:string;

    @Prop()
    price:number;

    @Prop()
    image:string ;
}

export const ProductSchema= SchemaFactory.createForClass(Product)

