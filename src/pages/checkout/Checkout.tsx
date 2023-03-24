import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useGetCart } from './useGetCart';
import ProductsList from './components/ProductsList';
import PaymentInfoInput from './components/PaymentInfoInput';
import CalculatedTotals from './components/CalculatedTotals';

export default function Checkout() {
  const { cart, data, isLoading } = useGetCart();

  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');

  if (isLoading || !data) {
    return (
      <Center h={300}>
        <Spinner />
      </Center>
    );
  }

  const paymentInfo = { cardNumber, expiration, cvv };
  const totals = cart.computeTotals(paymentInfo);

  return (
    <Box p={8} mb={100} maxWidth={1200}>
      <Heading>Checkout</Heading>
      <Divider my={4} />
      <Box>
        <Heading as="h2" size="md">
          Review Articles
        </Heading>
        <ProductsList cart={cart} />
      </Box>
      <Divider my={8} />
      <Box>
        <Heading as="h2" size="md">
          Payment method
        </Heading>
        <Flex mt={4}>
          <Box maxWidth={400}>
            <PaymentInfoInput
              cardHolder={cardHolder}
              cardNumber={cardNumber}
              expiration={expiration}
              cvv={cvv}
              setCardHolder={setCardHolder}
              setCardNumber={setCardNumber}
              setExpiration={setExpiration}
              setCvv={setCvv}
            />
          </Box>
          <VStack ml={16}>
            <CalculatedTotals {...totals} />
            <Button alignSelf="flex-end" colorScheme="blue">
              Pay
            </Button>
          </VStack>
        </Flex>
      </Box>
      <Divider my={8} />
    </Box>
  );
}
