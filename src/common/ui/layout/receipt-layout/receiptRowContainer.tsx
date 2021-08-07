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
import { ReceiptInterface } from '../../../util/common';

interface Props {
  receipt: ReceiptInterface;
  onDetailPressed: (receipt: ReceiptInterface) => void;
}
const ReceiptRowContainer = (props: Props) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.receiptContainer}>
        <View style={styles.detailContainer}>
          <Text style={styles.titleTiny}>{props.receipt.date}</Text>
          <Text style={styles.titleTiny}>
            {numeral(1000000).format('0,0')}đ
          </Text>
          <Text style={styles.titleTiny}>{props.receipt.email}</Text>
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
