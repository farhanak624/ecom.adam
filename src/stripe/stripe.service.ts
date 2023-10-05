import { Injectable } from '@nestjs/common';
const stripe = require('stripe')("sk_test_51Nxn61SHV8ndTbbcst1ryxXzCIaywz78HZ6sGsBB9BWGyBJYO0HIv113r1pUmwNYcNtgELgaG3hbOG3NILZCWmNy005AfWQy2d");

@Injectable()
export class StripeService {

    async createPaymentLink(quantity,price) {
        try {
            console.log("in strpe",quantity,price);
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'inr',
                unit_amount: price * 100,
                product_data: {
                  name: 'Checkout for Ecommerce app by Adam Tech'
                }
              },
              quantity: quantity
            }
          ],
          metadata: {
            userId: 'userid123'
          },
          mode: 'payment',
          success_url: 'https://yourwebsite.com/success',
          cancel_url: 'https://yourwebsite.com/cancel', 
        })

        console.log(session.url);
        return session.url;
        } catch (error) {
            console.log(error);
        }
}
}


