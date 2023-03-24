Create a React application based on requirements described below: 

Happy Fit 🙂
📃Happy Fit is a company that provides a benefits program which gives great discounts in certain e-commerce sites for all its subscribers. This program consists of the following benefits:

- ☑️ When a customer pays with a Visa card, the program will provide the following benefits: If the client buys 10 different products 🛒 or more, a 15% discount will be applied on the final amount to pay. In a different case if he buys 7 - 9 different products, a 10% discount will be applied on the final amount to pay otherwise a 5% discount is applied on the final amount.
- ☑️ When a customer pays with a Mastercard card, the program will provide the following benefits: If the client total amount 💵 to pay equals $100 or more, then a 17% discount will be applied on it. In a different case if the amount is in range of $75 - $99, a 12% discount will be applied. Otherwise, an 8% discount is applied no matter the amount.

- ❗Feel free to apply any component patterns you consider might fit.
- ❗Mock data as needed in order to process all data only on the front-end
- ❗Make any changes you consider will also improve performance.
- ❗Incorporate exception handling with at least one custom exception.
- ❗Refactor to allow creation of small testable units.

# Running the app

1. Install dependencies:
```
npm install
```

2. Run the app:
```
npm start
``` 

Can be accessed via http://localhost:3000. You should see the **Checkout** page with a mocked cart with three items loaded by default. You can use different carts by setting a `mockCart` parameter in the URL, e.g.:

```
http://localhost:3000/?mockCart=3 - the default cart with three items
http://localhost:3000/?mockCart=12 - a cart with twelve items
http://localhost:3000/?mockCart=expensive - a not-so expensive cart
```

Then you can fill the required information in the **Payment method** section. A few tips:
- Visa cards start with a "4"
- Mastercard cards start with a "5"

You should see the correct promotion applied depending on the card number and the items in the cart.

Finally, you can click the **Pay** button to trigger the mock API call. You can use "6666666666666666" as a card number to force an API error.