import React from 'react';
import { View } from 'react-native';
import NumberTextInput from '../../../common/ui/base/textInput/numberTextInput';
import styles from './style';
import categoryStyles from '../category/style';
import RNPickerSelect from 'react-native-picker-select';
import { ioProductDetailItem } from '../../../common/util/common';

interface Props {
  index: number;
  item: ioProductDetailItem;
  productList: [];
  companyList: [];
  handleValueChange: (index: number, value: string, type: string) => void;
  disable: boolean;
}
const IOProductSelect = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={categoryStyles.pickerContainer}>
        <RNPickerSelect
          style={categoryStyles}
          onValueChange={(value) =>
            props.handleValueChange(props.index, value, 'product')
          }
          placeholder={{
            label: 'Chọn sản phẩm',
            value: '',
          }}
          value={props.item.id_product}
          items={props.productList}
          useNativeAndroidPickerStyle={false}
          disabled={props.disable}
        />
      </View>
      <View style={categoryStyles.pickerContainer}>
        <RNPickerSelect
          style={categoryStyles}
          onValueChange={(value) =>
            props.handleValueChange(props.index, value, 'company')
          }
          placeholder={{
            label: 'Chọn công ty',
            value: '',
          }}
          value={props.item.id_company}
          items={props.companyList}
          useNativeAndroidPickerStyle={false}
          disabled={props.disable}
        />
      </View>
      <NumberTextInput
        placeholderText="Giá"
        iconName="tag"
        onTextChange={(value) =>
          props.handleValueChange(props.index, value, 'price')
        }
        value={props.item.price.toString()}
        editable={!props.disable}
      />
      <NumberTextInput
        placeholderText="Số lượng"
        iconName="info-circle"
        onTextChange={(value) =>
          props.handleValueChange(props.index, value, 'quantity')
        }
        value={props.item.quantity.toString()}
        editable={!props.disable}
      />
    </View>
  );
};

export default IOProductSelect;
