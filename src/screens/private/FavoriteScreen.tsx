import React from 'react';
import {Box, Image, Row} from 'native-base';
import {IMAGES} from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FavoriteScreen = () => {
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
    </Box>
  );
};

export default FavoriteScreen;
