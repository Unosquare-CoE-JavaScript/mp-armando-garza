import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Cart, CartResponse } from './models';
import { useMemo } from 'react';

export function useGetCart() {
  // used to forward the `mockCart` param to the msw handlers in /mock/handlers.ts
  const [params] = useSearchParams();

  const { data, ...rest } = useQuery<CartResponse>('my-cart', async () => {
    const response = await fetch('/api/my-cart?' + params.toString());
    return response.json();
  });

  const cart = useMemo(() => {
    if (data) {
      return Cart.createFromCartResponse(data);
    } else {
      return new Cart();
    }
  }, [data]);

  return {
    ...rest,
    data,
    cart,
  };
}
