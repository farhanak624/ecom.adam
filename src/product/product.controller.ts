import { Controller,Post,Body,ValidationPipe,UseGuards,UseInterceptors, Param,UploadedFile,Request,Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, UpdateProductDto } from './Dto/add.product.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer/multer.config';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService:ProductService,
    ){}
    
    @Roles('admin')
    @UseGuards(JwtAuthGuard,RoleGuard) 
    @UseInterceptors(FileInterceptor('image', multerConfig))
    @Post('createProduct')
    createProduct(@UploadedFile() file:any,@Body() productDto:ProductDto ){
            const imageFile=file.filename
        console.log('dtfijhgfdt',imageFile);
        console.log(productDto );
        
        return this.productService.createProduct(productDto,imageFile)
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard,RoleGuard) 
    @Delete('deleteProduct')
    async deleteProduct(@Body() id:string) {
        return this.productService.removeProduct(id)
    }
    @Roles('admin')
    @UseGuards(JwtAuthGuard,RoleGuard)
    @UseInterceptors(FileInterceptor('image', multerConfig))
    @Post('updateProduct/:id')
    async productUpdate(@Param('id')id:string,@UploadedFile() file:any,@Body() updateProductDto:UpdateProductDto){
        const image=file.filename
        console.log(image);
        try {
            
        return this.productService.updateProduct(updateProductDto,image,id)
             
        } catch (error) {
            console.log(error);
        } 
        
    } 
}