import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { type } from "os";


@Schema({
  timestamps:true  
})

export class User {

    @Prop({required:true}) //can add multiple option (type, string)
    name:string;

    @Prop({required:true})
    username:string;

    @Prop({required:true},)
    email:string;

    @Prop({required:true})
    password:string;

    @Prop({default:'user'})
    role:string;
}

export const UserSchema= SchemaFactory.createForClass(User)

