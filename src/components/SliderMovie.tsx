import {Box, FlatList, Heading, Image, Row, Text} from 'native-base';
import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {useNewReleaseQuery} from '../services';

const SliderMovie = () => {
  const [newRelease, setNewRelease] = React.useState([]);
  const {data, isFetching, error, isError} = useNewReleaseQuery();
  useEffect(() => {
    setNewRelease(data?.results?.slice(2, 6));
  }, [data?.results]);

  return (
    <Box px={2}>
      <Heading size={'sm'} color={'white'} px={1} pt={3} pb={4}>
        New Release
      </Heading>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={newRelease}
        renderItem={({item}: any) => (
          <Box px={2}>
            <Row>
              <Image
                source={{
                  uri:
                    'https://image.tmdb.org/t/p/original' + item?.backdrop_path,
                }}
                style={{
                  height: 120,
                  width: 300,
                }}
                alt="images"
                // resizeMode="contain"
                borderRadius={8}
              />
            </Row>
          </Box>
        )}
      />
    </Box>
  );
};

export default SliderMovie;
