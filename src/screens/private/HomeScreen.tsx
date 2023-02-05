import React from 'react';
import {Box, Image, Pressable, Row, Text, VStack} from 'native-base';
import {useMovieQuery} from '../../services';
import {ImageBackground} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const {data, isFetching, error, isError} = useMovieQuery();
  //   console.log(data?.results[0]?.poster_path);
  return (
    <Box flex={1} bg={'black'}>
      <Box>
        <Image
          source={{
            uri:
              'https://image.tmdb.org/t/p/w500' + data?.results[0]?.poster_path,
          }}
          style={{
            height: 400,
            width: '100%',
          }}
          alt="poster"
        />
        <Box
          //   h={'12'}
          position={'absolute'}
          bottom={4}
          px={10}
          //   bg={'blueGray.600'}
          zIndex={1}>
          <Row justifyContent={'space-between'} space={'16'}>
            <VStack alignItems={'center'}>
              <Entypo name="plus" size={20} color={'white'} />
              <Text color={'white'} bold>
                My List
              </Text>
            </VStack>
            <Pressable
              borderRadius={10}
              bg={'white'}
              alignItems={'center'}
              justifyContent={'center'}>
              <Row px={3} space={2}>
                <FontAwesome name="play" size={20} color={'black'} />
                <Text color={'black'} bold>
                  Play
                </Text>
              </Row>
            </Pressable>
            <VStack alignItems={'center'}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={'white'}
              />
              <Text color={'white'} bold>
                Info
              </Text>
            </VStack>
          </Row>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeScreen;
