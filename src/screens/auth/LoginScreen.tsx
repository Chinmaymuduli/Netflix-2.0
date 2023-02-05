import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Row,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IMAGES} from '../../assets';
import {COLORS} from '../../styles';

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  return (
    <Box flex={1} bg={'black'}>
      <Row alignItems={'center'} px={3}>
        <Ionicons name="arrow-back" size={30} color={'white'} />
        <Image
          source={IMAGES.BG}
          alt="bg"
          style={{
            height: 80,
            width: 150,
          }}
          resizeMode={'contain'}
        />
      </Row>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack px={3} flex={1} mt={20} mb={3}>
          <VStack mt={7} space={2}>
            <Text bold color={'white'}>
              Enter Email
            </Text>
            <FormControl isRequired isInvalid={'email' in errors} mt={1}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="Enter your Email"
                    borderRadius={8}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholderTextColor={'#000'}
                    fontSize={14}
                    backgroundColor={'#fff'}
                    borderWidth={2}
                    autoCapitalize={'none'}
                    mt={1}
                  />
                )}
                name="email"
                rules={{
                  required: '*Email is required',
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.email?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
          <VStack mt={7} space={2}>
            <Text bold color={'white'}>
              Enter Password
            </Text>
            <FormControl isRequired isInvalid={'password' in errors} mt={1}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="Enter your Password"
                    borderRadius={8}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholderTextColor={'#000'}
                    fontSize={14}
                    backgroundColor={'#fff'}
                    borderWidth={2}
                    autoCapitalize={'none'}
                    mt={1}
                  />
                )}
                name="password"
                rules={{
                  required: '*Password is required',
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.password?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
          <Box mt={7}>
            <Button bgColor={'red.500'}>
              <Text bold color={'white'}>
                Sign In
              </Text>
            </Button>
          </Box>
          <Pressable mt={5}>
            <Row justifyContent={'center'}>
              <Text color={'white'} fontWeight={'medium'}>
                New to Netflix ?
              </Text>
              <Text color={'white'} bold>
                {' '}
                Sign Up
              </Text>
            </Row>
          </Pressable>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default LoginScreen;
