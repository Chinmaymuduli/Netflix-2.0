import React from 'react';
import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Pressable,
  Row,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {Controller, useForm} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IMAGES} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {PublicNavigationProps} from '../../types/AllRoutes';

const SignUpScreen = () => {
  const navigation = useNavigation<PublicNavigationProps>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  return (
    <Box flex={1} bg={'white'}>
      <Row alignItems={'center'} px={3}>
        <Ionicons
          name="arrow-back"
          size={30}
          color={'black'}
          onPress={() => navigation.goBack()}
        />
        <Image
          source={IMAGES.LOGO}
          alt="bg"
          style={{
            height: 80,
            width: 150,
          }}
          resizeMode={'contain'}
        />
      </Row>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack px={4} space={3} mt={4}>
          <Text bold fontSize={19}>
            Ready to experience unlimited TV programmes & films ?
          </Text>
          <Text fontWeight={'semibold'} mt={4}>
            Create an account to learn more about Netflix
          </Text>
        </VStack>
        <VStack px={3} mb={3} mt={1}>
          <VStack mt={7} space={2}>
            <Text bold>Enter Full Name</Text>
            <FormControl isRequired isInvalid={'displayName' in errors} mt={1}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="Enter your Full Name"
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
                name="displayName"
                rules={{
                  required: '*Name is required',
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.displayName?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
          <VStack mt={7} space={2}>
            <Text bold>Enter Email</Text>
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
            <Text bold>Enter Password</Text>
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
                Sign Up
              </Text>
            </Button>
          </Box>
          <Pressable mt={5} onPress={() => navigation.navigate('LoginScreen')}>
            <Row justifyContent={'center'}>
              <Text fontWeight={'medium'}>Already In Netflix ?</Text>
              <Text bold> Sign In</Text>
            </Row>
          </Pressable>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default SignUpScreen;
