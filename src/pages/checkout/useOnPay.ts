import { useMutation } from 'react-query';
import { PaymentInfo } from './models';
import { PaymentError } from './errors';
import { useCallback } from 'react';

export function usePayMutation() {
  const mutation = useMutation(async (paymentInfo: PaymentInfo) => {
    const resp = await fetch('/my-cart/payment', {
      method: 'POST',
      body: JSON.stringify(paymentInfo),
    });
    if (resp.status !== 200) {
      throw new PaymentError();
    } else {
      return resp;
    }
  });

  const doPay = useCallback(
    (paymentInfo: PaymentInfo) => {
      mutation.mutate(paymentInfo);
    },
    [mutation]
  );

  return {
    ...mutation,
    doPay,
  };
}
