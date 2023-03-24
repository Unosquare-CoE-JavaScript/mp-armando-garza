import {
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react';
import { QuestionIcon } from '@chakra-ui/icons';
import React from 'react';

export interface PaymentInfoInputProps {
  cardHolder: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
  setCardHolder: (val: string) => void;
  setCardNumber: (val: string) => void;
  setExpiration: (val: string) => void;
  setCvv: (val: string) => void;
}

export default function PaymentInfoInput(props: PaymentInfoInputProps) {
  const {
    cardHolder,
    cardNumber,
    expiration,
    cvv,
    setCardHolder,
    setCardNumber,
    setExpiration,
    setCvv,
  } = props;

  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>Card holder</FormLabel>
        <Input
          type="text"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Card number</FormLabel>
        <Input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </FormControl>
      <HStack>
        <FormControl isRequired>
          <FormLabel>Expiration date</FormLabel>
          <Input
            type="text"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
          />
          <FormHelperText>MM/YY</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>CVV</FormLabel>
          <Input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
          <FormHelperText>
            <Popover trigger="hover">
              <PopoverTrigger>
                <QuestionIcon />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  The CVV/CVC code (Card Verification Value/Code) is located on
                  the back of your credit/debit card on the right side of the
                  white signature strip; it is always the last 3 digits in case
                  of VISA and MasterCard.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </FormHelperText>
        </FormControl>
      </HStack>
    </VStack>
  );
}
