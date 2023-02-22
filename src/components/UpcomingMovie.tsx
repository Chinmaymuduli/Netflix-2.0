import React, {useState} from 'react';
import {
  Box,
  FlatList,
  Heading,
  Image,
  Pressable,
  Row,
  Text,
  useDisclose,
} from 'native-base';
import {useUpcomingQuery} from '../services';
import CustomActionSheet from './CustomActionSheet';

const UpcomingMovie = () => {
  const {data, isFetching, error, isError} = useUpcomingQuery();
  // console.log(data);
  const [showId, setShowId] = useState('');
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <Box pb={4}>
      <Heading size={'sm'} px={3} py={6} color={'white'}>
        Top Rated Movies
      </Heading>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data?.results}
        renderItem={({item}: any) => (
          <Pressable
            px={2}
            onPress={() => {
              setShowId(item?.id), onOpen();
            }}>
            <Row>
              <Image
                source={{
                  uri: 'https://image.tmdb.org/t/p/w500' + item?.poster_path,
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
      <CustomActionSheet onClose={onClose} isOpen={isOpen} Id={showId} />
    </Box>
  );
};

export default UpcomingMovie;
