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
  getCategoryListFromAPI,
  getProductListFromAPI,
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
const AdminProduct = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);
  const [action, setAction] = useState<string>('Add');
  const [productList, setProductList] = useState([] as any);
  const [categoryList, setCategoryList] = useState([] as any);
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

  async function getCategoryList() {
    const categoryListFromAPI = await getCategoryListFromAPI();
    if (typeof categoryListFromAPI != 'string') {
      let tempList = [] as any;
      for (const index in categoryListFromAPI) {
        tempList.push({
          label: categoryListFromAPI[index].name,
          value: categoryListFromAPI[index]._id,
        });
      }
      setCategoryList(tempList);
    } else {
      //Toast
    }
  }

  useEffect(() => {
    getProductList();
    getCategoryList();
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
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalDeleteVisible(false);
  };

  const handleAddCategory = async () => {
    // if (name.trim().length !== 0) {
    //   const code = await addJustName(addCategoryUrl, name.trim());
    //   //Toast
    //   if (code === 200) {
    //     handleCloseModal();
    //     Actions.refresh({ key: Math.random() });
    //   } else {
    //     console.log(code);
    //   }
    // } else {
    //   //Toast err
    // }
  };

  const handleSaveCategory = async () => {
    // if (name.trim().length !== 0) {
    //   editItem.name = name.trim();
    //   const code = await editJustName(editCategoryUrl, editItem);
    //   //Toast
    //   if (code === 200) {
    //     handleCloseModal();
    //     Actions.refresh({ key: Math.random() });
    //   } else {
    //     console.log(code);
    //   }
    // } else {
    //   //Toast err
    // }
  };

  const handleDeletePressed = (item: ProductItem) => {
    // setModalDeleteVisible(true);
    // setEditItem(item);
  };

  const handleDeleteCategory = async () => {
    //   const code = await deleteJustName(deleteCategoryUrl, editItem);
    //   //Toast
    //   if (code === 200) {
    //     console.log('200');
    //     handleCloseModal();
    //     Actions.refresh({ key: Math.random() });
    //   } else {
    //     console.log(code);
    //   }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 3],
    });
    if (!result.cancelled) setImageBase64(result.base64);
    console.log(imageBase64);
  };

  const alertBody = () => {
    return (
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Tên sản phẩm"
              iconName="at"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{ required: true }}
          defaultValue={action === 'Add' ? '' : product.name}
          name="name"
        />
        {errors.name && <SmallText title="Tên không được để trống" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Hãng SX"
              iconName="home"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{ required: true, minLength: 5, maxLength: 100 }}
          name="brand"
          defaultValue={action === 'Add' ? '' : product.brand}
        />
        {errors.brand && <SmallText title="Hãng SX không đúng" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NumberTextInput
              placeholderText="Giá"
              iconName="home"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{ required: true, min: 1000, max: 1000000000 }}
          name="price"
          defaultValue={action === 'Add' ? '' : product.price}
        />
        {errors.price && <SmallText title="Giá không hợp lệ" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Mô tả"
              iconName="home"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{ required: true, minLength: 5, maxLength: 200 }}
          name="description"
          defaultValue={action === 'Add' ? '' : product.description}
        />
        {errors.description && <SmallText title="Mô tả không đúng" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Giảm giá"
              iconName="home"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{ required: true, minLength: 5, maxLength: 100 }}
          name="discount"
          defaultValue={action === 'Add' ? '' : product.discount}
        />
        {errors.discount && <SmallText title="Giảm giá không hợp lệ" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TouchableHighlight style={styles.pickerContainer}>
              <RNPickerSelect
                style={styles}
                onValueChange={onChange}
                placeholder={{
                  label: 'Chọn danh mục',
                  value: '',
                }}
                value={value}
                items={categoryList}
                useNativeAndroidPickerStyle={false}
              />
            </TouchableHighlight>
          )}
          rules={{ required: true }}
          name="id_category"
          defaultValue={action === 'Add' ? '' : product.id_category}
        />
        {errors.id_category && <SmallText title="Chưa chọn danh mục" />}

        <BlueButton title="Chọn hình ảnh" pressed={pickImage} />
        {typeof imageBase64 === 'string' ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <> </>
        )}
      </View>
    );
  };

  return (
    <CartLayout
      title="Sản phẩm"
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
            title="Thêm sản phẩm"
            okTitle="Thêm"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleAddCategory}
          >
            {alertBody()}
          </AdminAlert>
        ) : (
          <AdminAlert
            alertVisible={modalVisible}
            title="Chỉnh sửa sản phẩm"
            okTitle="Lưu"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleSaveCategory}
          >
            {alertBody()}
          </AdminAlert>
        )}
        <CustomAlert
          alertVisible={modalDeleteVisible}
          title="Xóa sản phẩm"
          okTitle="Xóa"
          onCancelPressed={handleCloseModal}
          onOkPressed={handleDeleteCategory}
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

export default AdminProduct;
