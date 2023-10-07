import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  Param,
  UploadedFile,
  Request,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDto } from './Dto/update.product.dto';
import { ProductDto } from './Dto/add.product.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer/multer.config';
import { Role } from 'src/auth/interface/user.interface';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @Post('createProduct')
  createProduct(@UploadedFile() file: any, @Body() productDto: ProductDto) {
    const imageFile = file.filename;
    return this.productService.createProduct(productDto,imageFile);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('deleteProduct')
  async deleteProduct(@Body() id: string) {
    return this.productService.removeProduct(id);
  }
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @Post('updateProduct/:id')
  async productUpdate(
    @Param('id') id: string,
    @UploadedFile() file: any,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    // const image = file.filename;
    // console.log(file);
    try {
      return this.productService.updateProduct(updateProductDto, file?.filename, id);
    } catch (error) {
      console.log(error);
    }
  }
}
