import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";



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

    @Prop({default:true})
    isActive:Boolean
    
}

export const UserSchema= SchemaFactory.createForClass(User)

