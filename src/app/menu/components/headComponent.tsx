import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { NormalTextInput } from '../../../common/ui/base/textInput';
import { Entypo, FontAwesome } from 'react-native-vector-icons';
import { Color } from '../../../common/util/enum';
import styles from '../style';
import IconBadge from './iconBadge';
import { Actions } from 'react-native-router-flux';

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
      <TouchableWithoutFeedback onPress={() => Actions.push('cart')}>
        <View>
          <FontAwesome name="shopping-cart" size={22} color={Color.black} />
          <IconBadge />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => props.profilePressed()}>
        <Entypo name="user" size={20} color={Color.black} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HeadComponent;
