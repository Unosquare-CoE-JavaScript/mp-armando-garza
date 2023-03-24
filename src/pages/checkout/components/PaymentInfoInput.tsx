import {
  FormControl,
  FormErrorMessage,
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
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PaymentInfo } from '../models';

export interface PaymentInfoInputProps {
  register: UseFormRegister<PaymentInfo>;
  errors: FieldErrors<PaymentInfo>;
}

export default function PaymentInfoInput(props: PaymentInfoInputProps) {
  const { register, errors } = props;

  return (
    <VStack>
      <CardHolderInput register={register} errors={errors} />
      <CardNumberInput register={register} errors={errors} />
      <HStack>
        <ExpirationDateInput register={register} errors={errors} />
        <CvvInput register={register} errors={errors} />
      </HStack>
    </VStack>
  );
}

function CardHolderInput(props: PaymentInfoInputProps) {
  const { register, errors } = props;

  return (
    <FormControl isRequired isInvalid={!!errors.cardHolder}>
      <FormLabel>Card holder</FormLabel>
      <Input
        type="text"
        {...register('cardHolder', {
          required: true,
          minLength: {
            value: 3,
            message: 'At least 3 characters required.',
          },
          maxLength: 50,
        })}
        maxLength={50}
      />
      {errors.cardHolder && (
        <FormErrorMessage>{errors.cardHolder.message}</FormErrorMessage>
      )}
    </FormControl>
  );
}

function CardNumberInput(props: PaymentInfoInputProps) {
  const { register, errors } = props;

  return (
    <FormControl isRequired isInvalid={!!errors.cardNumber}>
      <FormLabel>Card number</FormLabel>
      <Input
        type="text"
        {...register('cardNumber', {
          required: true,
          pattern: {
            // ToDo use `isCreditCard` from `validator` lib
            value: /^[0-9]{16}$/,
            message: 'Enter a valid card number.',
          },
        })}
        maxLength={16}
      />
      {errors.cardNumber && (
        <FormErrorMessage>{errors.cardNumber.message}</FormErrorMessage>
      )}
    </FormControl>
  );
}

function ExpirationDateInput(props: PaymentInfoInputProps) {
  const { register, errors } = props;

  return (
    <FormControl isRequired isInvalid={!!errors.expiration}>
      <FormLabel>Expiration date</FormLabel>
      <Input
        type="text"
        {...register('expiration', {
          required: true,
          pattern: {
            // ToDo actually validate the date, i.e. this accepts stuff like 14/43
            value: /^[0-9]{2}\/[0-9]{2}$/,
            message: 'Enter a valid date.',
          },
        })}
        maxLength={5}
      />
      {errors.expiration ? (
        <FormErrorMessage>{errors.expiration.message}</FormErrorMessage>
      ) : (
        <FormHelperText>MM/YY</FormHelperText>
      )}
    </FormControl>
  );
}

function CvvInput(props: PaymentInfoInputProps) {
  const { register, errors } = props;

  return (
    <FormControl isRequired isInvalid={!!errors.cvv}>
      <FormLabel>CVV</FormLabel>
      <Input
        type="password"
        {...register('cvv', {
          required: true,
          pattern: {
            value: /^[0-9]{3}$/,
            message: 'Enter a valid CVV.',
          },
        })}
        maxLength={3}
      />
      {errors.cvv ? (
        <FormErrorMessage>{errors.cvv.message}</FormErrorMessage>
      ) : (
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
                white signature strip; it is always the last 3 digits in case of
                VISA and MasterCard.
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </FormHelperText>
      )}
    </FormControl>
  );
}
