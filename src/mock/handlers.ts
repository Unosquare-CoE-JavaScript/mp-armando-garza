import { rest } from 'msw';
import cartExpensive from './cartExpensive.json';
import cartWithThreeItems from './cartWithThreeItems.json';
import cartWithTwelveItems from './cartWithTwelveItems.json';

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
];
