import currency from 'currency.js';
import { applyPromotions } from './promotions';

export interface CartResponse {
  cart: Cart;
}

export class Cart {
  items: CartItem[] = [];

  static createFromCartResponse(cartResp: CartResponse) {
    const newCart = new Cart();
    newCart.items = cartResp.cart.items;
    return newCart;
  }

  get subtotal() {
    let subtotal = currency(0);
    for (const item of this.items) {
      const itemTotal = currency(item.product.price).multiply(item.amount);
      subtotal = subtotal.add(itemTotal);
    }
    return subtotal;
  }

  computeTotals(paymentInfo: PaymentInfo) {
    const subtotal = this.subtotal;
    const promoResult = applyPromotions(this, paymentInfo);

    return {
      subtotal,
      total: promoResult ? promoResult.total : subtotal,
      promotionLabel: promoResult ? promoResult.label : '',
    };
  }
}

interface CartItem {
  product: Product;
  amount: number;
}

export interface Product {
  id: string;
  title: string;
  images: ProductImage[];
  price: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiration: string;
  cvv: string;
}

export interface Order {
  cart: Cart;
  paymentInfo: PaymentInfo;
  // e.g. shipping address, shipping instructions
}
