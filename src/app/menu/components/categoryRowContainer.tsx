import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { Alert, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { api_url } from '../../../common/util/constant';
import styles from '../style';
import SquareItemView from '../../../common/ui/layout/main-layout/components/squareItemView';
import { CategoryItem, ProductItem } from '../../../common/util/common';

interface Props {
  categoryItem: CategoryItem;
  productPressed: (item: ProductItem, categoryName: string) => void;
  // children: ReactNode;
}
const CategoryRowContainer = (props: Props) => {
  const [productlist, setProductList] = useState([] as any);

  const getProductListByCategory = async () => {
    axios({
      url: `/category/get-product-list/${props.categoryItem._id}`,
      baseURL: `${api_url}`,
      method: 'get',
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          setProductList(res.data['data']);
          console.log(productlist);
        }
      })
      .catch((err) => {
        Alert.alert('Lỗi lấy sản phẩm', err.response.data['message'], [
          {
            text: 'OK',
            style: 'cancel',
          },
        ]);
      });
  };

  useEffect(() => {
    getProductListByCategory();
  }, []);

  return (
    <View style={styles.rowContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleSmall}>{props.categoryItem.name}</Text>
      </View>
      <ScrollView
        style={styles.bodyContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {productlist.map((item: ProductItem) => {
          return (
            <SquareItemView
              key={item._id}
              item={item}
              productPressed={(item) =>
                props.productPressed(item, props.categoryItem.name)
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryRowContainer;