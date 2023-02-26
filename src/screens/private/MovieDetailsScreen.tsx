import React, {useCallback, useEffect, useState} from 'react';
import {
  useGetMovieVideoQuery,
  useMovieActorsQuery,
  useMovieDetailsQuery,
  useSimilarMovieQuery,
} from '../../services';
import {
  Box,
  Button,
  Divider,
  Icon,
  Image,
  Pressable,
  Row,
  ScrollView,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import {CustomActionSheet, Header, MoreMovie} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesTypes} from '../../types/AllRoutes';
import Entypo from 'react-native-vector-icons/Entypo';
import YoutubeIframe from 'react-native-youtube-iframe';
import {Dimensions} from 'react-native';

type DETAILS_PROPS = NativeStackScreenProps<
  PrivateRoutesTypes,
  'MovieDetailsScreen'
>;
const MovieDetailsScreen = ({route: {params}, navigation}: DETAILS_PROPS) => {
  const [movieId, setMovieId] = useState(params?.movie_id);
  const [showId, setShowId] = useState('');
  const [caster, setCaster] = useState<any[]>([]);
  const [director, setDirector] = useState<any[]>([]);
  const [videoKey, setVideoKey] = useState('');
  const [playing, setPlaying] = useState(true);
  const {data, isFetching, error} = useMovieDetailsQuery({
    movie_id: movieId,
  });
  const {data: ActorData, isFetching: actorFetching} = useMovieActorsQuery({
    movie_id: movieId,
  });
  const {data: similarData, isFetching: similarFetching} = useSimilarMovieQuery(
    {
      movie_id: movieId,
    },
  );
  useEffect(() => {
    const actors = ActorData?.cast.filter(
      (caster: {known_for_department: string}) =>
        caster?.known_for_department === 'Acting',
    );
    const director = ActorData?.cast.filter(
      (caster: {known_for_department: string}) =>
        caster?.known_for_department === 'Directing',
    );

    setCaster(actors);
    setDirector(director);
  }, [ActorData?.cast]);
  const [finalTime, setFinalTime] = useState<any>();

  useEffect(() => {
    const hours = Math.floor(data?.runtime / 60);
    const minutes = data?.runtime % 60;
    setFinalTime(hours + 'h' + ' ' + minutes + 'm');
  }, [data?.runtime]);
  const {isOpen, onOpen, onClose} = useDisclose();

  const {
    data: videoData,
    isFetching: videoFetching,
    isLoading: VideoLoading,
  } = useGetMovieVideoQuery({
    movie_id: movieId,
  });

  useEffect(() => {
    const video = videoData?.results?.find(
      (item: {name: string}) => item?.name === 'Official Trailer',
    );
    setVideoKey(video?.key);
  }, [videoData?.results]);

  const onStateChanged = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
    if (state === 'playing') {
      setPlaying(true);
    }
    if (state === 'paused') {
      setPlaying(false);
    }
  }, []);

  console.log({videoData});
  return (
    <Box flex={1} bg={'black'}>
      <Header />
      <ScrollView showsHorizontalScrollIndicator={false}>
        {VideoLoading ? (
          <Text>Loading....</Text>
        ) : (
          <Box>
            {videoKey ? (
              <YoutubeIframe
                height={200}
                width={Dimensions.get('window').width}
                play={playing}
                videoId={videoKey}
                onChangeState={onStateChanged}
              />
            ) : (
              <Text>Video Not Available</Text>
            )}
          </Box>
        )}

        <VStack space={2}>
          <VStack px={2} space={1}>
            <Text bold fontSize={20} color={'white'}>
              {data?.original_title}
            </Text>
            <Row space={4} mt={1}>
              <Text color={'gray.300'} fontSize={13} fontWeight={'medium'}>
                {new Date(data?.release_date).getFullYear()}
              </Text>
              <Box bg={'gray.500'} borderRadius={7}>
                <Text
                  fontWeight={'medium'}
                  color={'gray.200'}
                  fontSize={13}
                  px={2}>
                  U/A {data?.adult === false ? '13+' : '18+'}
                </Text>
              </Box>
              <Text fontWeight={'medium'} color={'gray.300'} fontSize={13}>
                {finalTime}
              </Text>
            </Row>
          </VStack>
          <Box px={2} mt={2}>
            <Button
              leftIcon={
                <Icon as={Ionicons} name="play" size="lg" color={'black'} />
              }
              bgColor={'white'}>
              <Text bold color={'black'}>
                Play
              </Text>
            </Button>
          </Box>
          <VStack mt={3} px={2}>
            <VStack>
              <Text color={'white'} fontWeight={'semibold'}>
                OverView
              </Text>
              <Text color={'white'} fontWeight={'medium'} fontSize={11}>
                {data?.overview}
              </Text>
            </VStack>
            <Pressable mt={2}>
              <VStack>
                <Box>
                  <Text color={'white'} fontWeight={'medium'} fontSize={12}>
                    Starring :{' '}
                    {caster?.[0]?.name +
                      caster?.[1]?.name +
                      caster?.[2]?.name +
                      caster?.[3]?.name}
                    ....
                  </Text>
                </Box>
                <Box>
                  <Text color={'white'} fontWeight={'medium'} fontSize={12}>
                    Director : {caster?.[0]?.name}
                  </Text>
                </Box>
              </VStack>
            </Pressable>
          </VStack>

          <Row justifyContent={'space-between'} px={'12'} mt={3}>
            <VStack alignItems={'center'}>
              <Entypo name="plus" size={24} color={'white'} />
              <Text fontWeight={'medium'} color={'gray.300'} fontSize={11}>
                My List
              </Text>
            </VStack>

            <VStack alignItems={'center'} space={1}>
              <Box>
                <Ionicons name="heart-outline" size={24} color={'white'} />
              </Box>
              <Text fontWeight={'medium'} color={'gray.300'} fontSize={11}>
                Rate
              </Text>
            </VStack>
            <VStack alignItems={'center'} space={1}>
              <Box>
                <Ionicons
                  name="share-social-outline"
                  size={24}
                  color={'white'}
                />
              </Box>
              <Text fontWeight={'medium'} color={'gray.300'} fontSize={11}>
                Share
              </Text>
            </VStack>
          </Row>
          {/* <VStack space={3} mt={3}>
            <VStack px={3}>
              <Text bold color={'white'}>
                More Like This
              </Text>
              <Divider h={1} bgColor={'red.500'} w={'24'} ml={1} />
            </VStack>
            <Row flexWrap={'wrap'} px={1}>
              {similarData?.results?.map((item: any) => (
                <Pressable
                  onPress={() => {
                    onOpen(), setShowId(item?.id);
                  }}
                  key={item?.id}
                  m={1.5}>
                  <Box>
                    <Image
                      source={{
                        uri:
                          'https://image.tmdb.org/t/p/w500' + item?.poster_path,
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
          </VStack> */}
          <MoreMovie movieId={movieId} />
        </VStack>
      </ScrollView>
      {/* ActionSheet */}
      <CustomActionSheet onClose={onClose} isOpen={isOpen} Id={showId} />
    </Box>
  );
};

export default MovieDetailsScreen;
