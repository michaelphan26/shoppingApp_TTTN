import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { NormalTextInput } from '../../../common/ui/base/textInput';
import { Entypo } from 'react-native-vector-icons';
import { Color } from '../../../common/util/enum';
import styles from '../style';

interface Props {
  onTextChange: (search: string) => void;
  profilePressed: () => void;
  search: string;
}
const HeadComponent = (props: Props) => {
  return (
    <View style={styles.boxContainer}>
      <NormalTextInput
        iconName="search"
        placeholderText="Search..."
        onTextChange={(text) => props.onTextChange(text)}
        value={props.search}
        editable={true}
      />
      <TouchableWithoutFeedback>
        <Entypo name="shopping-cart" size={20} color={Color.black} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => props.profilePressed()}>
        <Entypo name="user" size={20} color={Color.black} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HeadComponent;
