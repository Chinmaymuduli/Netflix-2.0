import React, {useState, useEffect} from 'react';
import {
  Actionsheet,
  Box,
  Divider,
  Image,
  Pressable,
  Row,
  Text,
  VStack,
} from 'native-base';
import {useMovieDetailsQuery} from '../services';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {PrivateNavigationProps} from '../types/AllRoutes';
import {useNavigation} from '@react-navigation/native';

type Action_Type = {
  isOpen?: boolean;
  onClose: () => void;
  Id: any;
};

const CustomActionSheet = ({isOpen, onClose, Id}: Action_Type) => {
  const navigation = useNavigation<PrivateNavigationProps>();
  const {data, isFetching, error} = useMovieDetailsQuery({movie_id: Id});
  const [finalTime, setFinalTime] = useState<any>();
  console.log({data});
  useEffect(() => {
    const hours = Math.floor(data?.runtime / 60);
    const minutes = data?.runtime % 60;
    setFinalTime(hours + 'h' + ' ' + minutes + 'm');
  }, [data?.runtime]);

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
      <Actionsheet.Content bg={'gray.700'}>
        <Box w={'full'}>
          <Row space={2}>
            <Box>
              <Image
                source={{
                  uri: 'https://image.tmdb.org/t/p/w500' + data?.poster_path,
                }}
                style={{
                  height: 130,
                  width: 100,
                }}
                alt="poster"
                borderRadius={7}
              />
            </Box>
            <VStack>
              <Row justifyContent={'space-between'}>
                <Text w={'48'} bold noOfLines={2} color={'white'}>
                  {data?.original_title}
                </Text>
              </Row>
              <Row space={4} mt={1}>
                <Text fontWeight={'medium'} color={'gray.300'} fontSize={13}>
                  {new Date(data?.release_date).getFullYear()}
                </Text>
                <Row space={2}>
                  <Text fontWeight={'medium'} color={'gray.300'} fontSize={13}>
                    U/A
                  </Text>
                  <Text fontWeight={'medium'} color={'gray.300'} fontSize={13}>
                    {data?.adult === false ? '13+' : '18+'}
                  </Text>
                </Row>
                <Text fontWeight={'medium'} color={'gray.300'} fontSize={13}>
                  {finalTime}
                </Text>
              </Row>
              <Text
                mt={2}
                fontWeight={'medium'}
                color={'white'}
                w={'56'}
                fontSize={12}
                noOfLines={4}>
                {data?.overview}
              </Text>
            </VStack>
            <Pressable
              onPress={onClose}
              bg={'gray.500'}
              position={'absolute'}
              right={1}
              p={1}
              borderRadius={40}>
              <Ionicons name="close" size={21} color={'white'} />
            </Pressable>
          </Row>
          <Row px={7} justifyContent={'space-between'} mt={5}>
            <VStack alignItems={'center'} space={1}>
              <Box bg={'white'} p={2} alignItems={'center'} borderRadius={30}>
                <Ionicons name="play" size={21} color={'black'} />
              </Box>
              <Text fontWeight={'medium'} color={'gray.300'} fontSize={11}>
                Play
              </Text>
            </VStack>
            <VStack alignItems={'center'} space={1}>
              <Box
                bg={'gray.500'}
                p={2}
                alignItems={'center'}
                borderRadius={30}>
                <Ionicons name="add" size={21} color={'white'} />
              </Box>
              <Text fontWeight={'medium'} color={'gray.300'} fontSize={11}>
                Add
              </Text>
            </VStack>
            <VStack alignItems={'center'} space={1}>
              <Box
                bg={'gray.500'}
                p={2}
                alignItems={'center'}
                borderRadius={30}>
                <Ionicons name="heart-outline" size={21} color={'white'} />
              </Box>
              <Text fontWeight={'medium'} color={'gray.300'} fontSize={11}>
                Rate
              </Text>
            </VStack>
            <VStack alignItems={'center'} space={1}>
              <Box
                bg={'gray.500'}
                p={2}
                alignItems={'center'}
                borderRadius={30}>
                <Ionicons
                  name="share-social-outline"
                  size={21}
                  color={'white'}
                />
              </Box>
              <Text fontWeight={'medium'} color={'gray.300'} fontSize={11}>
                Share
              </Text>
            </VStack>
          </Row>
          <Divider mt={3} bg={'gray.500'} />
          <Pressable
            onPress={() => {
              onClose(),
                navigation.navigate('MovieDetailsScreen', {movie_id: data?.id});
            }}>
            <Row
              alignItems={'center'}
              justifyContent={'space-between'}
              px={3}
              py={3}>
              <Row alignItems={'center'} space={2}>
                <Feather name="info" size={20} color={'white'} />
                <Text color={'white'} fontWeight={'semibold'}>
                  Details & More
                </Text>
              </Row>
              <Ionicons name="chevron-forward" size={20} color={'white'} />
            </Row>
          </Pressable>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default CustomActionSheet;
