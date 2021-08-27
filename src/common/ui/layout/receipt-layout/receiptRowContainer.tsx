import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { api_url } from '../../../../util/constant';
import styles from './style';
import SquareItemView from './squareItemView';
import numeral from 'numeral';
import { FontAwesome, Entypo } from 'react-native-vector-icons';
import CartIconContainer from './cartIconContainer';
import { ProductItem } from '../../../../util/common';
import {
  getReceiptTypeByIDFromAPI,
  initialJustNameItem,
  JustNameItem,
  ReceiptInterface,
} from '../../../util/common';

interface Props {
  receipt: ReceiptInterface;
  onDetailPressed: (receipt: ReceiptInterface) => void;
}
const ReceiptRowContainer = (props: Props) => {
  const [receiptType, setReceiptType] =
    useState<JustNameItem>(initialJustNameItem);

  async function getReceiptType() {
    const receiptTypeFromAPI = await getReceiptTypeByIDFromAPI(
      props.receipt.id_receiptType
    );
    if (typeof receiptTypeFromAPI !== 'string') {
      setReceiptType(receiptTypeFromAPI);
    }
  }

  useEffect(() => {
    getReceiptType();
  }, []);

  return (
    <TouchableWithoutFeedback>
      <View style={styles.receiptContainer}>
        <View style={styles.detailContainer}>
          <Text style={styles.titleTiny} numberOfLines={1}>
            {props.receipt.email}
          </Text>
          <Text style={styles.titleTiny} numberOfLines={1}>
            {numeral(props.receipt.total).format('0,0')}đ
          </Text>
          <Text style={styles.titleTiny} numberOfLines={1}>
            {props.receipt.date}
          </Text>
          <Text style={styles.titleTiny} numberOfLines={1}>
            Trạng thái: {receiptType.name}
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => props.onDetailPressed(props.receipt)}
        >
          <View style={styles.iconContainer}>
            <FontAwesome name="chevron-right" size={20} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ReceiptRowContainer;
