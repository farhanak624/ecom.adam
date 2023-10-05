import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Request, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Roles('user')
  @UseGuards(JwtAuthGuard,RoleGuard) 
  @Post('addToCart')
  create(@Request() req ,@Body() createCartDto: CreateCartDto) {
    const userId= req.user.userId
    return this.cartService.createCart(createCartDto,userId);
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard,RoleGuard) 
  @Put('reduceProduct')
  reduce(@Request() req ,@Body() createCartDto: CreateCartDto) {
    return this.cartService.decreaseCount(createCartDto,req.user.userId);
  }
  @Roles('user')
  @UseGuards(JwtAuthGuard,RoleGuard) 
  @Delete('removeProduct')
  removeProduct(@Request() req ,@Body() createCartDto: CreateCartDto) {
    return this.cartService.removeCartProduct(createCartDto,req.user.userId);
  }
  
  @Roles('user')
  @UseGuards(JwtAuthGuard,RoleGuard) 
  @Get('getUserCart')
  getCartProducts(@Request() req) {
    return this.cartService.findAll(req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  
}
