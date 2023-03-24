import { rest } from 'msw';
import cartExpensive from './cartExpensive.json';
import cartWithThreeItems from './cartWithThreeItems.json';
import cartWithTwelveItems from './cartWithTwelveItems.json';
import { PaymentInfo } from '../pages/checkout/models';

export const handlers = [
  rest.get('/api/my-cart', (req, res, ctx) => {
    const mockCart = req.url.searchParams.get('mockCart');

    switch (mockCart) {
      case 'expensive':
        return res(ctx.json(cartExpensive));
      case '12':
        return res(ctx.json(cartWithTwelveItems));
      case '3':
      default:
        return res(ctx.json(cartWithThreeItems));
    }
  }),

  rest.post('/my-cart/payment', async (req, res, ctx) => {
    const paymentInfo = (await req.json()) as PaymentInfo;

    switch (paymentInfo.cardNumber) {
      case '6666666666666666':
        return res(
          ctx.delay(1500),
          ctx.status(500),
          ctx.text('Internal server error')
        );
      default:
        return res(ctx.delay(1500), ctx.status(200));
    }
  }),
];
