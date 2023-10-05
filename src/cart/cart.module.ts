import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart, cartSchema } from './schema/cart.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Cart', schema: cartSchema }])],
  controllers: [CartController],
  providers: [CartService], 
})
export class CartModule {}
