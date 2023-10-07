import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Cart } from 'src/cart/schema/cart.schema';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<Cart>,
    private stripePayment: StripeService,
  ) {}

  async getCartDetails(userId) {
    try {
      const UserCart: any = await this.cartModel
        .findOne({ userId: new mongoose.Types.ObjectId(userId) })
        .populate('products.product_id');
      console.log(UserCart);
      if (UserCart) {
        const products = UserCart.products;
        let totalQuantity = 0;
        let totalPrice = 0;
        console.log(products);

        for (const product of products) {
          totalQuantity += product.count;
          console.log('price', product.product_id.price);
          totalPrice += product.product_id.price * product.count;
        }
        return await this.stripePayment.createPaymentLink(
          totalQuantity,
          totalPrice,
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
