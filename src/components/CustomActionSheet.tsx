import React, {useState, useEffect} from 'react';
import {Actionsheet, Box, Image, Row, Text, VStack} from 'native-base';
import {useMovieDetailsQuery} from '../services';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Action_Type = {
  isOpen?: boolean;
  onClose: () => void;
  Id: any;
};

const CustomActionSheet = ({isOpen, onClose, Id}: Action_Type) => {
  const {data, isFetching, error} = useMovieDetailsQuery({movie_id: Id});
  const [finalTime, setFinalTime] = useState<any>();

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
            <Box
              bg={'gray.500'}
              position={'absolute'}
              right={1}
              p={1}
              borderRadius={40}>
              <Ionicons name="close" size={21} color={'white'} />
            </Box>
          </Row>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default CustomActionSheet;
