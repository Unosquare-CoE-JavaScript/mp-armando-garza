export class PaymentError extends Error {
  constructor() {
    super('Payment failed.');
    this.name = 'PaymentError';
  }
}
