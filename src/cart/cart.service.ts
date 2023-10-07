import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/product/schema/product.schema';
import mongoose, { Model, Types } from 'mongoose';
import { Cart } from './schema/cart.schema';
import { count } from 'console';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<any>,
  ) {}

  async createCart(createCartDto: CreateCartDto, userId) {
    console.log('userID ', userId);
    try {
      const { product_id } = createCartDto;
      const UserCart: any = await this.cartModel.findOne({
        userId: new mongoose.Types.ObjectId(userId),
      });

      if (UserCart) {
        const productIndex = UserCart.products.findIndex((data) => {
          console.log(data.product_id, product_id);
          return data.product_id.toString() == product_id;
          // console.log("product index is",productIndex);
        });

        if (productIndex !== -1) {
          console.log('index checking');
          UserCart.products[productIndex].count += 1;
          console.log('index exist');
          await UserCart.save();
        } else {
          console.log('index not exist');

          const newProductId = new mongoose.Types.ObjectId(product_id);
          UserCart.products.push({
            product_id: newProductId,
            count: 1,
          });
        }
        await UserCart.save();

        console.log('product index is', productIndex);
      }
      if (!UserCart) {
        await new this.cartModel({
          userId: userId,
          products: [
            {
              product_id: new Types.ObjectId(createCartDto.product_id),
              count: 1,
            },
          ],
        }).save();
      }

      // console.log("usercart existing",UserCart);

      return 'Product Added to cart';
    } catch (error) {
      console.log('error is', error);
    }
  }

  async decreaseCount(createCartDto, userId) {
    try {
      const { product_id } = createCartDto;
      const UserCart: any = await this.cartModel.findOne({
        userId: new mongoose.Types.ObjectId(userId),
      });

      if (UserCart) {
        const productIndex = UserCart.products.findIndex((data) => {
          console.log(data.product_id, product_id);
          return data.product_id.toString() == product_id;
          // console.log("product index is",productIndex);
        });

        if (productIndex !== -1) {
          console.log('index checking');

          const cartProductCount = UserCart.products[productIndex].count;
          if (cartProductCount != 1) {
            UserCart.products[productIndex].count -= 1;
          } else {
            return {
              status: HttpStatus.BAD_GATEWAY,
              message: 'minimum count reached',
            };
          }
          console.log('product count is', cartProductCount);
          await UserCart.save();
        } else {
          console.log('index not exist');

          const newProductId = new mongoose.Types.ObjectId(product_id);
          UserCart.products.push({
            product_id: newProductId,
            count: 1,
          });
        }
        await UserCart.save();

        // console.log("product index is",productIndex);
      }
      if (!UserCart) {
        return 'Usercart not found';
      }

      // console.log("usercart existing",UserCart);

      return 'Product Count Reduced';
    } catch (error) {
      console.log('error is', error);
    }
  }

  async removeCartProduct(createCartDto, userId) {
    // console.log(createCartDto,userId);
    const { product_id } = createCartDto;

    const UserCart: any = await this.cartModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (UserCart) {
      const getProductInCartArray = UserCart.products;

      const productIndex = UserCart.products.findIndex((data) => {
        // console.log( data.product_id,product_id);
        return data.product_id.toString() == product_id;
      });

      if (productIndex !== -1) {
        console.log('prdct indx', productIndex);
        UserCart.products.splice(productIndex, 1);
        await UserCart.save();
      } else {
        throw new HttpException(
          'product not found in the cart',
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      throw new HttpException('User Cart not found', HttpStatus.FORBIDDEN);
    }

    return `removed a cart`;
  }

  async findAll(userId) {
    const UserCart: any = await this.cartModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (UserCart) {
      const getProductfromCart = await this.cartModel
        .findOne({ userId: new mongoose.Types.ObjectId(userId) })
        .populate('products.product_id');
      return { CartDetails: getProductfromCart };
    } else {
      return "User Cart not found";
    }
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }
}
