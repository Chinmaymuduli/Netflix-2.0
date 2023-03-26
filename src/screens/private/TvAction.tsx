import React, {useCallback, useEffect, useState} from 'react';
import {
  useSimilarTvShowQuery,
  useTvDetailsQuery,
  useTvStarDetailsQuery,
  useTvVideoDetailsQuery,
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
import {Header, ModalComponent} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesTypes} from '../../types/AllRoutes';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import YoutubeIframe from 'react-native-youtube-iframe';
import {Dimensions} from 'react-native';

type DETAILS_PROPS = NativeStackScreenProps<PrivateRoutesTypes, 'TvAction'>;
const TvAction = ({route: {params}, navigation}: DETAILS_PROPS) => {
  const [tvId, setTvId] = useState(params?.tv_id);
  const [showId, setShowId] = useState('');
  const [caster, setCaster] = useState<any[]>([]);
  const [director, setDirector] = useState<any[]>([]);
  const [videoKey, setVideoKey] = useState('');
  const [playing, setPlaying] = useState(false);
  const [fullModalVisible, setFullModalVisible] = useState(false);
  const {data, isFetching, error} = useTvDetailsQuery({
    tv_id: tvId,
  });
  const {data: ActorData, isFetching: actorFetching} = useTvStarDetailsQuery({
    tv_id: tvId,
  });

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
  } = useTvVideoDetailsQuery({
    tv_id: tvId,
  });
  const {
    data: similarData,
    isFetching: similarFetching,
    isLoading: similarLoading,
  } = useSimilarTvShowQuery({
    tv_id: tvId,
  });

  useEffect(() => {
    const video = videoData?.results?.find(
      (item: {type: string}) => item?.type === 'Trailer',
    );
    setVideoKey(video?.key);
  }, [videoData?.results]);

  const onStateChanged = useCallback((state: string) => {
    console.log({state});
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
              <Box
                h={'40'}
                borderWidth={1}
                borderColor={'gray.700'}
                borderRadius={8}
                justifyContent={'center'}
                alignItems={'center'}>
                <AntDesign name="youtube" color={'red'} size={30} />
                <Text fontWeight={'semibold'} color={'white'}>
                  Video Not Available
                </Text>
              </Box>
            )}
          </Box>
        )}

        <VStack space={2}>
          <VStack px={2} space={1}>
            <Text bold fontSize={20} color={'white'}>
              {data?.original_name}
            </Text>
            <Row space={4} mt={1}>
              <Text color={'gray.300'} fontSize={13} fontWeight={'medium'}>
                {new Date(data?.first_air_date).getFullYear()}
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
                {data?.seasons?.length} session
              </Text>
            </Row>
          </VStack>
          <Box px={2} mt={2}>
            <Button
              onPress={() => setPlaying(!playing)}
              leftIcon={
                <Icon
                  as={Ionicons}
                  name={playing ? 'pause' : 'play'}
                  size="lg"
                  color={'black'}
                />
              }
              bgColor={'white'}>
              <Text bold color={'black'}>
                {playing ? 'Pause' : 'Play'}
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
            <Pressable mt={2} onPress={() => setFullModalVisible(true)}>
              <VStack>
                <Box>
                  <Text color={'white'} fontWeight={'medium'} fontSize={12}>
                    Starring :{' '}
                    {
                      caster?.[0]?.name + caster?.[1]?.name
                      //   caster?.[2]?.name +
                      //   caster?.[3]?.name
                    }
                    ....
                  </Text>
                </Box>
                {/* <Box>
                  <Text color={'white'} fontWeight={'medium'} fontSize={12}>
                    Director : {director?.[0]?.name}
                  </Text>
                </Box> */}
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
          <VStack space={3} mt={3}>
            <VStack px={3}>
              <Text bold color={'white'}>
                More Like This
              </Text>
              <Divider h={1} bgColor={'red.500'} w={'24'} ml={1} />
            </VStack>
            <Row flexWrap={'wrap'} px={1}>
              {similarData?.results?.map((item: any) => (
                <Pressable
                  // onPress={() => {
                  //   onOpen(), setShowId(item?.id);
                  // }}
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
          </VStack>
          {/* <MoreMovie movieId={movieId} /> */}
        </VStack>
      </ScrollView>
      {/* ActionSheet */}
      {/* <CustomActionSheet onClose={onClose} isOpen={isOpen} Id={showId} /> */}
      <ModalComponent
        setFullModalVisible={setFullModalVisible}
        fullModalVisible={fullModalVisible}
        data={data}
      />
    </Box>
  );
};

export default TvAction;
