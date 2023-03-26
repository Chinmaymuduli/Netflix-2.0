import React from 'react';
import {Box, Image, Pressable, Row, ScrollView} from 'native-base';
import {IMAGES} from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useMovieQuery} from '../../services';

const FavoriteScreen = () => {
  const {data, isFetching, error, isError} = useMovieQuery();
  return (
    <Box flex={1} bg={'black'}>
      <Box>
        <Row
          justifyContent={'space-between'}
          alignItems={'center'}
          px={3}
          py={2}>
          <Box>
            <Image
              source={IMAGES.LOGO_}
              style={{
                height: 50,
                width: 50,
              }}
              alt="logo"
            />
          </Box>
          <Row space={8}>
            <Ionicons name="search" size={24} color={'white'} />
            <Image
              source={IMAGES.PROFILE}
              style={{
                height: 35,
                width: 35,
              }}
              borderRadius={8}
              alt="image"
              resizeMode="contain"
            />
          </Row>
        </Row>
      </Box>
      <ScrollView>
        <Row flexWrap={'wrap'} px={1}>
          {data?.results?.map((item: any) => (
            <Pressable
              // onPress={() => {
              //   onOpen(), setShowId(item?.id);
              // }}
              key={item?.id}
              m={1.5}>
              <Box>
                <Image
                  source={{
                    uri: 'https://image.tmdb.org/t/p/w500' + item?.poster_path,
                  }}
                  style={{
                    height: 130,
                    width: 105,
                  }}
                  alt="poster"
                  borderRadius={7}
                />
              </Box>
            </Pressable>
          ))}
        </Row>
      </ScrollView>
    </Box>
  );
};

export default FavoriteScreen;
