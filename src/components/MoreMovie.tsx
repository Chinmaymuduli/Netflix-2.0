import React, {useState} from 'react';
import {
  Box,
  Divider,
  Image,
  Pressable,
  Row,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import CustomActionSheet from './CustomActionSheet';
import {useSimilarMovieQuery} from '../services';
import {useNavigation} from '@react-navigation/native';
import {PrivateNavigationProps} from '../types/AllRoutes';

type Props = {
  movieId?: any;
};
const MoreMovie = ({movieId}: Props) => {
  const navigation = useNavigation<PrivateNavigationProps>();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [showId, setShowId] = useState('');
  const {data: similarData, isFetching: similarFetching} = useSimilarMovieQuery(
    {
      movie_id: movieId,
    },
  );
  return (
    <>
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
              onPress={() => {
                onOpen(), setShowId(item?.id);
              }}
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
      </VStack>
      <CustomActionSheet onClose={onClose} isOpen={isOpen} Id={showId} />
    </>
  );
};

export default MoreMovie;
