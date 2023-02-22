import React, {useState} from 'react';
import {
  Box,
  Button,
  FlatList,
  Heading,
  Image,
  Pressable,
  Row,
  ScrollView,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import {useMovieQuery} from '../../services';
import {ImageBackground} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IMAGES} from '../../assets';
import {
  AiringTv,
  CustomActionSheet,
  PopularTvShows,
  SliderMovie,
  TopRatedTv,
  UpcomingMovie,
} from '../../components';

const HomeScreen = () => {
  const [showId, setShowId] = useState();
  const [posterId, setPosterId] = useState();
  const {data, isFetching, error, isError} = useMovieQuery();
  // console.log({data});
  const {isOpen, onOpen, onClose} = useDisclose();
  const {
    isOpen: posterOpen,
    onOpen: posterOnOpen,
    onClose: posterOnClose,
  } = useDisclose();
  return (
    <Box flex={1} bg={'black'}>
      <ScrollView>
        <Box>
          <ImageBackground
            source={{
              uri:
                'https://image.tmdb.org/t/p/w500' +
                data?.results[0]?.poster_path,
            }}
            style={{
              height: 400,
              width: '100%',
            }}
            alt="poster">
            <Box flex={1}>
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
          </ImageBackground>
          <Box position={'absolute'} bottom={4} px={10} zIndex={1}>
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
              <Pressable
                onPress={() => {
                  posterOnOpen(), setPosterId(data?.results[0]?.id);
                }}>
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
              </Pressable>
            </Row>
          </Box>
        </Box>
        <Box flex={1}>
          <Heading size={'sm'} color={'white'} my={4} px={3}>
            Blockbuster Movies
          </Heading>
          <Box>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={data?.results}
              renderItem={({item}: any) => (
                <Pressable
                  px={2}
                  onPress={() => {
                    onOpen(), setShowId(item?.id);
                  }}>
                  <Row>
                    <Image
                      source={{
                        uri:
                          'https://image.tmdb.org/t/p/w500' + item?.poster_path,
                      }}
                      style={{
                        height: 130,
                        width: 92,
                      }}
                      alt="images"
                      borderRadius={8}
                    />
                  </Row>
                </Pressable>
              )}
            />
          </Box>
        </Box>
        {/* Top Rated Movie */}
        <UpcomingMovie />
        {/* Latest Movie */}
        <PopularTvShows />
        {/* Movie Carousel */}
        <SliderMovie />
        {/* Top rated Tv */}
        <TopRatedTv />
        {/* New TV */}
        <AiringTv />
      </ScrollView>
      <CustomActionSheet onClose={onClose} isOpen={isOpen} Id={showId} />
      <CustomActionSheet
        onClose={posterOnClose}
        isOpen={posterOpen}
        Id={posterId}
      />
    </Box>
  );
};

export default HomeScreen;
