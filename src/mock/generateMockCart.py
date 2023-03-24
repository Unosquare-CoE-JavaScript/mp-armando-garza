import json
from pprint import pprint
from random import randint, choice

with open('products.json') as infile:
    items = []
    item_count = 0
    total = 0
    products = json.load(infile)['products']

    for _ in range(3):
        product = choice(products)
        clean_product = {
            'id': product['id'],
            'title': product['title'],
            'price': product['price'],
            'images': [product['images'][0]]
        }
        amount = randint(1, 2)

        item_count += amount
        total += amount * product['price']

        items.append({'product': clean_product, 'amount': amount})

    print(json.dumps({'cart': {'items': items}}))
    print(item_count)
    print(total)
