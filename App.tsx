import React from 'react';
import {NativeBaseProvider, StatusBar, Text} from 'native-base';
import Routes from './src/Routes';
import {NavigationContainer} from '@react-navigation/native';
import CustomTheme from './src/styles';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import {AppContextProvider} from './src/contexts';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider theme={CustomTheme}>
          {/* <StatusBar backgroundColor={'red'} /> */}
          <AppContextProvider>
            <Routes />
          </AppContextProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
