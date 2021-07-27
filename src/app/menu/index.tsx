import React from 'react';
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

interface Props {}
const Menu = (props: Props) => {
  const handleTextChange = (data: string) => {
    console.log(data);
  };

  return (
    <MainLayout>
      <View style={styles.boxContainer}>
        <NormalTextInput
          iconName="search"
          placeholderText="Search..."
          onTextChange={handleTextChange}
        />
        <TouchableWithoutFeedback>
          <Entypo name="shopping-cart" size={20} color={Color.black} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Entypo name="user" size={20} color={Color.black} />
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 1, backgroundColor: 'red' }}></View>
    </MainLayout>
  );
};

export default Menu;
