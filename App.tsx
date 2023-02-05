import React from 'react';
import {NativeBaseProvider, StatusBar, Text} from 'native-base';
import Routes from './src/Routes';
import {NavigationContainer} from '@react-navigation/native';
import CustomTheme from './src/styles';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={CustomTheme}>
        <StatusBar backgroundColor={'red'} />
        <Routes />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
