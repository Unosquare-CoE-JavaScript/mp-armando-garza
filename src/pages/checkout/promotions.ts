import currency from 'currency.js';
import { Cart, PaymentInfo } from './models';

export interface Promotion {
  apply: (cart: Cart, paymentInfo: PaymentInfo) => PromotionResult | undefined;
}

export interface PromotionResult {
  label: string;
  total: currency;
}

class VisaCardPromotion implements Promotion {
  apply(cart: Cart, paymentInfo: PaymentInfo): PromotionResult | undefined {
    if (!this.isVisaCard(paymentInfo.cardNumber)) {
      return;
    }

    if (cart.items.length >= 10) {
      return {
        total: cart.subtotal.multiply(1 - 0.15),
        label: '15% off for Visa cards applied',
      };
    }

    if (cart.items.length >= 7) {
      return {
        total: cart.subtotal.multiply(1 - 0.1),
        label: '10% off for Visa cards applied',
      };
    }

    return {
      total: cart.subtotal.multiply(1 - 0.05),
      label: '5% off for Visa cards applied',
    };
  }

  private isVisaCard(cardNumber: string) {
    // source: https://www.forbes.com/advisor/credit-cards/what-does-your-credit-card-number-mean/
    return cardNumber.startsWith('4');
  }
}

class MastercardPromotion implements Promotion {
  apply(cart: Cart, paymentInfo: PaymentInfo): PromotionResult | undefined {
    if (!this.isMastercard(paymentInfo.cardNumber)) {
      return;
    }

    if (cart.subtotal.value >= 100) {
      return {
        total: cart.subtotal.multiply(1 - 0.17),
        label: '17% off for Mastercard applied',
      };
    }

    if (cart.subtotal.value >= 75) {
      return {
        total: cart.subtotal.multiply(1 - 0.12),
        label: '12% off for Mastercard applied',
      };
    }

    return {
      total: cart.subtotal.multiply(1 - 0.08),
      label: '8% off for Mastercard applied',
    };
  }

  private isMastercard(cardNumber: string) {
    // source: https://www.forbes.com/advisor/credit-cards/what-does-your-credit-card-number-mean/
    return cardNumber.startsWith('5');
  }
}

const availablePromotions = [
  new VisaCardPromotion(),
  new MastercardPromotion(),
];

export function applyPromotions(
  cart: Cart,
  paymentInfo: PaymentInfo
): PromotionResult | null {
  for (const promo of availablePromotions) {
    const result = promo.apply(cart, paymentInfo);
    if (result) {
      return result;
    }
  }
  return null;
}
