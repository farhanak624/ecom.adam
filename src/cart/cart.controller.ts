import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Public } from 'src/auth/decorator/public.decorator';
import { GetUser } from 'src/auth/decorator/get.user.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Public()
  @Post('addToCart')
  create(@Request() req, @Body() createCartDto: CreateCartDto , @GetUser() user) {
    console.log(user)
    //return this.cartService.createCart(createCartDto, userId);
  }


  @Put('reduceProduct')
  reduce(@Request() req, @Body() createCartDto: CreateCartDto) {
    return this.cartService.decreaseCount(createCartDto, req.user.userId);
  }

  @Delete('removeProduct')
  removeProduct(@Request() req, @Body() createCartDto: CreateCartDto) {
    return this.cartService.removeCartProduct(createCartDto, req.user.userId);
  }


  @Get('getUserCart')
  getCartProducts(@Request() req) {
    return this.cartService.findAll(req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }
}
