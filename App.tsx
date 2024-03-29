import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/models/store';
import Route from './src/routes';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  const onBackButtonPressed = () => {
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackButtonPressed);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressed);
  });

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <Route />
      </Provider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
