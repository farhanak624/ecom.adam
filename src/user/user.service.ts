import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private  userModel:Model<User>,
    ){}

    async viewProfile(userId){
    const   ObjectId=new mongoose.Types.ObjectId(userId)
    const userDetails= await  this.userModel.findById({_id:ObjectId})
    if(!userDetails){
        return "Please login"
    }
    console.log("user profile",userDetails);
    return userDetails;
    }

    // Get User By Id
    async getUserById(id: string) {      
       
        const user=await this.userModel.findById(id);   
        console.log(user);
        return user
    }

}
