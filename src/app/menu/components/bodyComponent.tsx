import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import SquareItemView from '../../../common/ui/layout/main-layout/components/squareItemView';
import CategoryRowContainer from './categoryRowContainer';
import { api_url } from '../../../common/util/constant';
import styles from '../style';
import ProductRowContainer from '../../../common/ui/layout/main-layout/components/productRowContainer';
import ProductRowItem from '../../../common/ui/layout/main-layout/components/productRowContainer';
import { CategoryItem, ProductItem } from '../../../common/util/common';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../models/cartReducer';

interface Props {
  searchText: string;
}
const BodyComponent = (props: Props) => {
  const [categoryList, setCategoryList] = useState([] as any);
  const [productList, setProductList] = useState([] as any);
  const dispatch = useDispatch();

  const getProductList = async () => {
    axios({
      url: `/product/product-list`,
      baseURL: `${api_url}`,
      method: 'get',
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          setProductList(res.data['data']);
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

  const getCategory = () => {
    axios({
      url: '/category/category-list',
      method: 'get',
      baseURL: `${api_url}`,
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          setCategoryList(res.data['data']);
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

  const handleProductPressed = (
    item: ProductItem,
    categoryName: string
  ): void => {
    Actions.push('product', { item: item, categoryName: categoryName });
  };

  const handleSearchPressed = async (item: ProductItem): Promise<void> => {
    const categoryName = await getCategoryName(item);
    console.log(categoryName);
    Actions.push('product', {
      item: item,
      categoryName: categoryName,
    });
  };

  const getCategoryName = async (product: ProductItem): Promise<string> => {
    let categoryName = '';
    await axios({
      url: `category/get-name/${product.id_category}`,
      baseURL: `${api_url}`,
      method: 'get',
    }).then((res) => {
      if (res.data['code'] === 200) {
        categoryName = res.data['data'].name;
      }
    });
    return categoryName;
  };

  const handleAddToCart = async (item: ProductItem): Promise<void> => {
    const token = await AsyncStorage.getItem('@token');
    console.log(token);
    dispatch(
      addToCart({
        cartItem: {
          id_product: item._id,
          price: item.price,
          discount: item.discount,
          quantity: 1,
        },
        token: token,
      })
    );
  };

  useEffect(() => {
    getCategory();
    getProductList();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      {!props.searchText
        ? categoryList.map((item: CategoryItem) => {
            return (
              <CategoryRowContainer
                categoryItem={item}
                key={item._id}
                productPressed={handleProductPressed}
              />
            );
          })
        : productList
            .filter((item: ProductItem) => {
              return (
                item.name
                  .toLowerCase()
                  .startsWith(props.searchText.trim().toLowerCase()) ||
                item.brand
                  .toLowerCase()
                  .startsWith(props.searchText.trim().toLowerCase())
              );
            })
            .map((item: ProductItem) => {
              return (
                <ProductRowContainer
                  item={item}
                  key={item._id}
                  addToCart={handleAddToCart}
                  productPressed={handleSearchPressed}
                />
              );
            })}
    </ScrollView>
  );
};

export default BodyComponent;
