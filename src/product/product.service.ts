import { HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './schema/product.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { spec } from 'node:test/reporters';
import { UpdateCartDto } from 'src/cart/dto/update-cart.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async createProduct(productDto, filename) {
    console.log(productDto);
    console.log('file is', filename);
    const { productName, modelName, specification, color, price } = productDto;
    return await new this.productModel({
      color,
      productName,
      modelName,
      specification,
      image: filename,
      price,
    }).save();
  }

  async removeProduct(prodId) {
    try {
      const ObjectId = new mongoose.Types.ObjectId(prodId);
      const productForRemove = await this.productModel.findById({
        _id: ObjectId,
      });
      console.log(productForRemove);
      if (!productForRemove) {
        return 'product not found';
      }
      // const isremovedProduct= await this.productModel.deleteOne({_id:ObjectId})
      console.log(productForRemove.image);
      fs.unlink(`./uploads/${productForRemove.image}`, (error) => {
        if (error) {
          console.log('Error deleting existing image', error);
        } else {
          console.log('deleted image');
        }
      });
      // return isremovedProduct;
    } catch (error) {
      console.log(error);
    }
  }
  async updateProduct(updateProductDto, image, id) {
    try {
      console.log(updateProductDto);
      const { productName, modelName, specification, color, price } =
        updateProductDto;
      console.log('p name', productName);
      console.log(image);

      const productForUpdate = await this.productModel.findById({
        _id: new mongoose.Types.ObjectId(id),
      });
      if (!productForUpdate) {
        return { status: HttpStatus.BAD_GATEWAY, message: 'Product Not found' };
      }
      const updateProduct = await this.productModel.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        {
          productName,
          modelName,
          specification,
          color,
          price,
          image: image,
        },
      );
      if (image) {
        fs.unlink(`./uploads/${image}`, (err) => {
          if (err) {
            console.error('Error deleting old image:', err);
          } else {
            console.log('Old image deleted successfully');
          }
        });
      }
      return updateProduct;
    } catch (error) {
      console.log(error);
    }
  }
}
