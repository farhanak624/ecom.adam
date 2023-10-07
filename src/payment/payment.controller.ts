import {
  Controller,
  UseGuards,
  Get,
  Param,
  Request,
  Post,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}


  @Get('cartPayment')
  cartPayment(@Request() req: any) {
    return this.paymentService.getCartDetails(req.user.userId);  
  }

  
}
