import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useGetCart } from './useGetCart';
import ProductsList from './components/ProductsList';
import PaymentInfoInput from './components/PaymentInfoInput';
import CalculatedTotals from './components/CalculatedTotals';
import { PaymentInfo } from './models';
import { useForm } from 'react-hook-form';
import { usePayMutation } from './useOnPay';

export default function Checkout() {
  const { cart, data, isLoading } = useGetCart();
  const payMutation = usePayMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PaymentInfo>({
    defaultValues: {
      cardHolder: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
  });

  if (isLoading || !data) {
    return (
      <Center h={300}>
        <Spinner />
      </Center>
    );
  }

  const paymentInfo = watch();
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
        <form onSubmit={handleSubmit(payMutation.doPay)}>
          <Flex mt={4}>
            <Box maxWidth={400}>
              <PaymentInfoInput register={register} errors={errors} />
            </Box>
            <VStack ml={16} alignItems="flex-end">
              <CalculatedTotals {...totals} />
              <Button
                type="submit"
                colorScheme="blue"
                isDisabled={Object.keys(errors).length > 0}
                isLoading={payMutation.isLoading}
              >
                Pay
              </Button>
              {payMutation.isError && (
                <Text color="red.500">Payment error.</Text>
              )}
              {payMutation.isSuccess && (
                <Text color="green.500">Payment successful!</Text>
              )}
            </VStack>
          </Flex>
        </form>
      </Box>
      <Divider my={8} />
    </Box>
  );
}
