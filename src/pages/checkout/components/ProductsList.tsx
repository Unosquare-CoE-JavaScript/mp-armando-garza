import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Cart } from '../models';
import currency from 'currency.js';

export interface ProductListProps {
  cart: Cart;
}

export default function ProductsList({ cart }: ProductListProps) {
  return (
    <Box>
      {cart.items.map((item) => (
        <Flex mt={4}>
          <Box>
            <Image
              src={item.product.images[0].url}
              alt={item.product.images[0].alt}
            />
          </Box>
          <Box p={4}>
            <Box fontSize="xl" fontWeight="medium">
              {item.product.title}
            </Box>
            <Box fontSize="sm">
              Price:
              <Text as="span" ml={1} fontWeight="bold">
                {currency(item.product.price).format()}
              </Text>
            </Box>
            <Box fontSize="sm">Quantity: {item.amount}</Box>
          </Box>
        </Flex>
      ))}
    </Box>
  );
}
