import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, cartSchema } from 'src/cart/schema/cart.schema';
import { StripeService } from 'src/stripe/stripe.service';

@Module({
  imports:[MongooseModule.forFeature([{ name: Cart.name, schema: cartSchema }])],
  controllers: [PaymentController],
  providers: [PaymentService,StripeService]
})
export class PaymentModule {}
