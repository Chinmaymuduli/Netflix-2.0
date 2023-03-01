import {StyleSheet, View, Modal, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Center,
  Divider,
  FlatList,
  HStack,
  Input,
  Pressable,
  Row,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useMovieActorsQuery, useTvStarDetailsQuery} from '../services';

type ModalType = {
  fullModalVisible?: boolean;
  setFullModalVisible: (prev: boolean) => void;
  data?: any;
  // OnSelect?: (item: any) => void;
  isFetching?: boolean;
};

const ModalComponent = ({
  fullModalVisible,
  setFullModalVisible,
  data,
  // OnSelect,
  isFetching,
}: ModalType) => {
  const [caster, setCaster] = useState<any[]>([]);
  const [director, setDirector] = useState<any[]>([]);
  const [writer, setWriter] = useState<any[]>([]);
  const {data: ActorData, isFetching: actorFetching} = useMovieActorsQuery({
    movie_id: data?.id,
  });
  const {data: ActorTvData, isFetching: actorTvFetching} =
    useTvStarDetailsQuery({
      tv_id: data?.id,
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
    const writing = ActorData?.cast.filter(
      (caster: {known_for_department: string}) =>
        caster?.known_for_department === 'Writing',
    );

    setCaster(actors);
    setDirector(director);
    setWriter(writing);
  }, [ActorData?.cast]);
  useEffect(() => {
    const actors = ActorTvData?.cast.filter(
      (caster: {known_for_department: string}) =>
        caster?.known_for_department === 'Acting',
    );
    const director = ActorTvData?.cast.filter(
      (caster: {known_for_department: string}) =>
        caster?.known_for_department === 'Directing',
    );
    const writing = ActorTvData?.cast.filter(
      (caster: {known_for_department: string}) =>
        caster?.known_for_department === 'Writing',
    );

    setCaster(actors);
    setDirector(director);
    setWriter(writing);
  }, [ActorTvData?.cast]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={fullModalVisible}
      onRequestClose={() => {
        setFullModalVisible(!fullModalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Row justifyContent={'space-between'} alignItems={'center'}>
            <Text bold color={'white'} fontSize={16} w={'72'} noOfLines={2}>
              {data?.original_title || data?.original_name}
            </Text>
            <Pressable
              onPress={() => setFullModalVisible(false)}
              bg={'gray.500'}
              borderRadius={20}
              p={1}>
              <Ionicons name="close" size={23} color={'white'} />
            </Pressable>
          </Row>
          {/* <Divider /> */}
          <ScrollView
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}>
            <Center mt={5}>
              <Box>
                <Text
                  bold
                  color={'white'}
                  fontSize={18}
                  underline
                  textAlign={'center'}>
                  Cast
                </Text>
                <VStack alignItems={'center'} space={2}>
                  {caster?.map(item => (
                    <Box key={item?.id}>
                      <Text color={'gray.400'} fontWeight={'medium'}>
                        {item?.name}
                      </Text>
                    </Box>
                  ))}
                </VStack>
                <Box mt={2}>
                  <Text
                    bold
                    color={'white'}
                    fontSize={18}
                    underline
                    textAlign={'center'}>
                    Director
                  </Text>
                  <VStack alignItems={'center'} space={2} mt={1}>
                    {director?.map(item => (
                      <Box key={item?.id}>
                        <Text color={'gray.400'} fontWeight={'medium'}>
                          {item?.name}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
                <Box mt={2}>
                  <Text
                    bold
                    color={'white'}
                    fontSize={18}
                    underline
                    textAlign={'center'}>
                    Writer
                  </Text>
                  <VStack alignItems={'center'} space={2} mt={1}>
                    {writer?.map(item => (
                      <Box key={item?.id}>
                        <Text color={'gray.400'} fontWeight={'medium'}>
                          {item?.name}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
                <Box mt={2}>
                  <Text
                    bold
                    color={'white'}
                    fontSize={18}
                    underline
                    textAlign={'center'}>
                    Genres
                  </Text>
                  <VStack alignItems={'center'} space={2} mt={1}>
                    {data?.genres?.map((item: any) => (
                      <Box key={item?.id}>
                        <Text color={'gray.400'} fontWeight={'medium'}>
                          {item?.name}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
                <Box mt={2}>
                  <Text
                    bold
                    color={'white'}
                    fontSize={18}
                    underline
                    textAlign={'center'}>
                    Languages
                  </Text>
                  <VStack alignItems={'center'} space={2} mt={1}>
                    {data?.spoken_languages?.map((item: any) => (
                      <Box key={item?.id}>
                        <Text color={'gray.400'} fontWeight={'medium'}>
                          {item?.name}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </Box>
            </Center>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: '#343434',
    minHeight: Dimensions.get('window').height,
  },
  modalView: {
    margin: 20,
    borderRadius: 10,
  },
});
