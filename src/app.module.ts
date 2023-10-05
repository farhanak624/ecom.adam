import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AuthController } from './auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { StripeService } from './stripe/stripe.service';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    PassportModule,
    JwtModule.register({secret:process.env.JWT_SECRET}),
    UserModule,
    ProductModule,
    CartModule,
    PaymentModule,
  ], 
  controllers: [AppController],
  providers: [AppService,JwtStrategy, StripeService],
})
export class AppModule {}
