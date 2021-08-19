import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from '../../menu/style';
import {
  getCompanyDetailFromAPI,
  getProductDetailFromAPI,
  initialCompanyItem,
  initialProductItem,
  ioProductDetailItem,
} from '../../../common/util/common';
import numeral from 'numeral';
import Toast from 'react-native-simple-toast';

interface Props {
  item: ioProductDetailItem;
}
const IOProductDetailRow = (props: Props) => {
  const [product, setProduct] = useState(initialProductItem);
  const [company, setCompany] = useState(initialCompanyItem);

  const getProductDetail = async () => {
    const productDetail = await getProductDetailFromAPI(props.item.id_product);
    if (typeof productDetail !== 'string') {
      setProduct(productDetail);
    } else {
      Toast.showWithGravity(
        'Không thể lấy thông tin sản phẩm',
        Toast.SHORT,
        Toast.CENTER
      );
    }
  };

  const getCompanyDetail = async () => {
    const companyDetail = await getCompanyDetailFromAPI(props.item.id_company);
    if (typeof companyDetail !== 'string') {
      setCompany(companyDetail);
    } else {
      Toast.showWithGravity(
        'Không thể lấy thông tin đối tác',
        Toast.SHORT,
        Toast.CENTER
      );
    }
  };

  useEffect(() => {
    getProductDetail();
    getCompanyDetail();
  }, []);

  return (
    <View style={styles.productContainer}>
      <View style={styles.detailContainer}>
        <Text style={styles.titleTiny}>{product.name}</Text>
        <Text style={styles.titleTiny}>{company.name}</Text>
        <Text style={styles.titleTiny}>
          Giá:
          {numeral(props.item.price).format('0,0')}đ
        </Text>
        <Text style={styles.titleTiny}>Số lượng: {props.item.quantity}</Text>
      </View>
    </View>
  );
};

export default IOProductDetailRow;
