import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { NormalTextInput } from '../../../common/ui/base/textInput';
import { Entypo, FontAwesome } from 'react-native-vector-icons';
import { Color } from '../../../common/util/enum';
import styles from '../style';
import CartIconBadge from './cartIconBadge';
import { Actions } from 'react-native-router-flux';

interface Props {
  onTextChange: (search: string) => void;
  profilePressed: () => void;
  adminPressed: () => void;
  search: string;
  isAdmin: boolean;
}
const HeadComponent = (props: Props) => {
  return (
    <View style={styles.boxContainer}>
      <NormalTextInput
        iconName="search"
        placeholderText="Tìm kiếm..."
        onTextChange={(text) => props.onTextChange(text)}
        value={props.search}
        editable={true}
      />
      <TouchableWithoutFeedback onPress={() => Actions.push('cart')}>
        <View>
          <FontAwesome name="shopping-cart" size={25} color={Color.black} />
          <CartIconBadge />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => props.profilePressed()}>
        <Entypo name="user" size={22} color={Color.black} />
      </TouchableWithoutFeedback>
      {props.isAdmin ? (
        <TouchableWithoutFeedback onPress={() => props.adminPressed()}>
          <Entypo name="database" size={25} color={Color.black} />
        </TouchableWithoutFeedback>
      ) : (
        <></>
      )}
    </View>
  );
};

export default HeadComponent;
