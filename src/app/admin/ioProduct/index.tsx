import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AdminAlert, CustomAlert } from '../../../common/ui/base/admin-alert';
import { NormalTextInput } from '../../../common/ui/base/textInput';
import CartLayout from '../../../common/ui/layout/cart-layout';
import MainLayout from '../../../common/ui/layout/main-layout';
import ProductRowItemNoCart from '../../../common/ui/layout/main-layout/components/productRowContainerNoCart';
import {
  addProductAPI,
  editProductAPI,
  getCategoryListFromAPI,
  getIOTypeFromAPI,
  getProductListFromAPI,
  initialJustNameItem,
  initialProductItem,
  ProductItem,
} from '../../../common/util/common';
import { Color } from '../../../common/util/enum';
import styles from '../category/style';
import { Entypo } from 'react-native-vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { SmallText } from '../../../common/ui/base/errorText';
import { ScrollView } from 'react-native-gesture-handler';
import NumberTextInput from '../../../common/ui/base/textInput/numberTextInput';
import RNPickerSelect from 'react-native-picker-select';
import { BlueButton } from '../../../common/ui/base/button';
import * as ImagePicker from 'expo-image-picker';

interface Props {}
const AdminIOProduct = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);
  const [action, setAction] = useState<string>('Add');
  const [productList, setProductList] = useState([] as any);
  const [io, setIO] = useState({ label: '', value: '' });
  const [ioTypeList, setIOTypeList] = useState([] as any);
  const [searchText, setSearchText] = useState<string>('');
  const [product, setProduct] = useState<ProductItem>(initialProductItem);
  const [imageBase64, setImageBase64] = useState<string | undefined>('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ reValidateMode: 'onSubmit' });

  async function getProductList() {
    const productListFromAPI = await getProductListFromAPI();
    if (typeof productListFromAPI != 'string') {
      setProductList(productListFromAPI);
    } else {
      //Toast
    }
  }

  async function getIOTypeList() {
    const ioTypeListFromAPI = await getIOTypeFromAPI();
    let tempList = [] as any;
    for (const index in ioTypeListFromAPI) {
      tempList.push({
        label: ioTypeListFromAPI[index].name,
        value: ioTypeListFromAPI[index]._id,
      });
    }
    setIOTypeList(tempList);
  }

  useEffect(() => {
    getProductList();
    getIOTypeList();
  }, []);

  const handleAddPressed = () => {
    setModalVisible(true);
    setAction('Add');
  };

  const handleEditPressed = (item: ProductItem) => {
    setModalVisible(true);
    setAction('Edit');
    setProduct(item);
    reset({
      brand: item.brand,
      name: item.name,
      price: item.price.toString(),
      description: item.description.toString(),
      discount: item.discount.toString(),
      id_category: item.id_category,
    });
    setImageBase64(item.image);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalDeleteVisible(false);
    setProduct(initialProductItem);
    reset(initialProductItem);
    setImageBase64('');
  };

  const handleAddProduct = async (info: ProductItem) => {};

  const handleSaveProduct = async (info: ProductItem) => {};

  const handleDeletePressed = (item: ProductItem) => {
    // setModalDeleteVisible(true);
    // setEditItem(item);
  };

  const handleDeleteProduct = async () => {};

  const alertBody = () => {
    return (
      <View>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={styles}
            onValueChange={(item) => setIO(item)}
            placeholder={{
              label: 'Chọn trạng thái',
              value: '',
            }}
            value={io}
            items={ioTypeList}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <BlueButton title="Thêm chi tiết" />
      </View>
    );
  };

  return (
    <CartLayout
      title="Nhập xuất"
      backPressed={() => {
        Actions.pop();
        setTimeout(() => {
          Actions.refresh({ key: Math.random() });
        }, 10);
      }}
    >
      <View style={styles.searchContainer}>
        <NormalTextInput
          iconName="search"
          placeholderText="Tìm kiếm..."
          onTextChange={(text) => setSearchText(text)}
          value={searchText}
          editable={true}
        />
        {action === 'Add' ? (
          <AdminAlert
            alertVisible={modalVisible}
            title="Nhập xuất"
            okTitle="Thêm"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleSubmit(handleAddProduct)}
          >
            {alertBody()}
          </AdminAlert>
        ) : (
          <AdminAlert
            alertVisible={modalVisible}
            title="Chỉnh sửa nhập xuất"
            okTitle="Lưu"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleSubmit(handleSaveProduct)}
          >
            {alertBody()}
          </AdminAlert>
        )}
        <CustomAlert
          alertVisible={modalDeleteVisible}
          title="Xóa sản phẩm"
          okTitle="Xóa"
          onCancelPressed={handleCloseModal}
          onOkPressed={handleDeleteProduct}
        />
        <TouchableWithoutFeedback onPress={handleAddPressed}>
          <Entypo name="plus" size={30} color={Color.black} />
        </TouchableWithoutFeedback>
      </View>

      <FlatList
        data={productList.filter(
          (item: ProductItem) =>
            item.name
              .toLowerCase()
              .startsWith(searchText.trim().toLowerCase()) ||
            item.brand.toLowerCase().startsWith(searchText.trim().toLowerCase())
        )}
        style={styles.listContainer}
        renderItem={(item: ProductItem) => {
          return (
            <ProductRowItemNoCart
              item={item.item}
              onEditPressed={handleEditPressed}
            />
          );
        }}
        keyExtractor={(item: ProductItem) => item._id}
      />
    </CartLayout>
  );
};

export default AdminIOProduct;
