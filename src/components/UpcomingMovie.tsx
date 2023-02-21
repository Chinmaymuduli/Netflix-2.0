import React from 'react';
import {Box, FlatList, Heading, Image, Pressable, Row, Text} from 'native-base';
import {useUpcomingQuery} from '../services';

const UpcomingMovie = () => {
  const {data, isFetching, error, isError} = useUpcomingQuery();
  // console.log(data);
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
          <Pressable px={2}>
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
    </Box>
  );
};

export default UpcomingMovie;
