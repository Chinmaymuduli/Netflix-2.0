// import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeBaseProvider, Text} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <Text>Hello</Text>
    </NativeBaseProvider>
  );
};

export default App;

// const styles = StyleSheet.create({});
