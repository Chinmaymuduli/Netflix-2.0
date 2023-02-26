import {Box, Image, Row} from 'native-base';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IMAGES} from '../assets';

const Header = () => {
  return (
    <Box bg={'black'}>
      <Row py={4} alignItems={'center'} px={5} justifyContent={'space-between'}>
        <Box>
          <Ionicons name="arrow-back" size={22} color={'white'} />
        </Box>
        <Row alignItems={'center'} space={8}>
          <Ionicons name="search" size={22} color={'white'} />
          <Image
            source={IMAGES.PROFILE}
            style={{
              height: 30,
              width: 30,
            }}
            alt="profile"
            borderRadius={6}
          />
        </Row>
      </Row>
    </Box>
  );
};

export default Header;
