import { Box, Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import currency from 'currency.js';

export interface CalculatedTotalsProps {
  subtotal: currency;
  total: currency;
  promotionLabel?: string;
}

export default function CalculatedTotals(props: CalculatedTotalsProps) {
  const { subtotal, total, promotionLabel } = props;

  return (
    <VStack alignItems="flex-end">
      <Flex>
        <Box>Subtotal:</Box>
        <Box ml={4}>{subtotal.format()}</Box>
      </Flex>
      {promotionLabel && <Box>{promotionLabel}</Box>}
      <Flex>
        <Box>Total:</Box>
        <Box ml={4}>{total.format()}</Box>
      </Flex>
    </VStack>
  );
}
