import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { NormalTextInput } from '../../common/ui/base/textInput';
import MainLayout from '../../common/ui/layout/main-layout';
import styles from './style';
import { Entypo } from 'react-native-vector-icons';
import { Color } from '../../common/util/enum';
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';

interface Props {}
const Menu = (props: Props) => {
  const [search, setSearch] = useState('');

  const handleTextChange = (searchText: string) => {
    setSearch(searchText);
  };

  const handleProfilePress = async () => {
    const token = await AsyncStorage.getItem('@token');
    if (!token) {
      Actions.push('login');
    }
    Actions.push('profile');
  };

  return (
    <MainLayout>
      <View style={styles.boxContainer}>
        <NormalTextInput
          iconName="search"
          placeholderText="Search..."
          onTextChange={handleTextChange}
          value={search}
        />
        <TouchableWithoutFeedback>
          <Entypo name="shopping-cart" size={20} color={Color.black} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleProfilePress}>
          <Entypo name="user" size={20} color={Color.black} />
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 1, backgroundColor: 'red' }}></View>
    </MainLayout>
  );
};

export default Menu;
