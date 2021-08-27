import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import styles from '../../menu/style';
import {
  getCompanyDetailFromAPI,
  getProductDetailFromAPI,
  initialCompanyItem,
  initialProductItem,
  ioProductDetailItem,
} from '../../../common/util/common';
import numeral from 'numeral';
import Toast from 'react-native-root-toast';

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
      Toast.show('Không thể lấy thông tin sản phẩm', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  };

  const getCompanyDetail = async () => {
    const companyDetail = await getCompanyDetailFromAPI(props.item.id_company);
    if (typeof companyDetail !== 'string') {
      setCompany(companyDetail);
    } else {
      Toast.show('Không thể lấy thông tin đối tác', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  };

  useEffect(() => {
    getProductDetail();
    getCompanyDetail();
  }, []);

  return (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: `data:image/png;base64,${product.image}` }}
        style={styles.imageRound}
        resizeMode="contain"
      />
      <View style={styles.detailContainer}>
        <Text style={styles.titleTiny} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.titleTiny} numberOfLines={1}>
          {company.name}
        </Text>
        <Text style={styles.titleTiny} numberOfLines={1}>
          Giá:
          {numeral(props.item.price).format('0,0')}đ
        </Text>
        <Text style={styles.titleTiny} numberOfLines={1}>
          Số lượng: {props.item.quantity}
        </Text>
      </View>
    </View>
  );
};

export default IOProductDetailRow;
