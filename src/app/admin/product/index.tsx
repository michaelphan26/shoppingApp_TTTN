import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AdminAlert } from '../../../common/ui/base/admin-alert';
import { NormalTextInput } from '../../../common/ui/base/textInput';
import CartLayout from '../../../common/ui/layout/cart-layout';
import ProductRowItemNoCart from '../../../common/ui/layout/main-layout/components/productRowContainerNoCart';
import {
  addProductAPI,
  editProductAPI,
  getCategoryListFromAPI,
  getProductListAdminFromAPI,
  getProductListFromAPI,
  initialProductItem,
  ProductItem,
  showToast,
} from '../../../common/util/common';
import { Color } from '../../../common/util/enum';
import styles from '../category/style';
import { Entypo } from 'react-native-vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { SmallText } from '../../../common/ui/base/errorText';
import NumberTextInput from '../../../common/ui/base/textInput/numberTextInput';
import RNPickerSelect from 'react-native-picker-select';
import { BlueButton } from '../../../common/ui/base/button';
import * as ImagePicker from 'expo-image-picker';

interface Props {}
const AdminProduct = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [action, setAction] = useState<string>('Add');
  const [productList, setProductList] = useState([] as any);
  const [categoryList, setCategoryList] = useState([] as any);
  const [searchText, setSearchText] = useState<string>('');
  const [product, setProduct] = useState<ProductItem>(initialProductItem);
  const [imageBase64, setImageBase64] = useState<string | undefined>('');
  const statusList = [
    { label: 'Đang kinh doanh', value: 'true' },
    { label: 'Ngừng kinh doanh', value: 'false' },
  ];
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ reValidateMode: 'onSubmit' });

  async function getProductList() {
    const productListFromAPI = await getProductListAdminFromAPI();
    if (typeof productListFromAPI != 'string') {
      setProductList(productListFromAPI);
    } else {
      //Toast
      showToast('Không thể lấy danh sách sản phẩm');
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
      showToast('Không thể lấy danh sách danh mục');
    }
  }

  useEffect(() => {
    getProductList();
    getCategoryList();
  }, []);

  const handleAddPressed = () => {
    setModalVisible(true);
    setAction('Add');
    showToast('Chèn \\n để xuống dòng mô tả');
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
    showToast('Chèn \\n để xuống dòng mô tả');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setProduct(initialProductItem);
    reset(initialProductItem);
    setImageBase64('');
  };

  const handleAddProduct = async (info: ProductItem) => {
    console.log(info);
    if (imageBase64 !== '' && info.status.toString() !== '') {
      info.image = imageBase64;
      delete info._id;
      delete info.stock;
      const code = await addProductAPI(info);
      //Toast
      if (code === 200) {
        handleCloseModal();
        Actions.refresh({ key: Math.random() });
        showToast('Thêm sản phẩm thành công');
      } else {
        showToast('Không thể thêm sản phẩm');
      }
    } else {
      //Toast err
      showToast('Không thể thêm sản phẩm');
    }
  };

  const handleSaveProduct = async (info: ProductItem) => {
    console.log(info);
    info.image = imageBase64;
    delete info._id;
    delete info.stock;
    const code = await editProductAPI(info, product._id);
    //Toast
    if (code === 200) {
      handleCloseModal();
      Actions.refresh({ key: Math.random() });
      showToast('Chỉnh sửa sản phẩm thành công');
    } else {
      showToast('Không thể chỉnh sửa sản phẩm');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 3],
    });
    if (!result.cancelled) setImageBase64(result.base64);
  };

  const alertBody = () => {
    return (
      <View style={{ alignItems: 'center' }}>
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
          rules={{ required: true, minLength: 2, maxLength: 64 }}
          defaultValue={action === 'Add' ? '' : product.name}
          name="name"
        />
        {errors.name && <SmallText title="Tên không đúng" />}

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
          rules={{ required: true, minLength: 3, maxLength: 20 }}
          name="brand"
          defaultValue={action === 'Add' ? '' : product.brand}
        />
        {errors.brand && <SmallText title="Hãng SX không đúng" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NumberTextInput
              placeholderText="Giá"
              iconName="tag"
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
              iconName="comment"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{ required: true, minLength: 5, maxLength: 500 }}
          name="description"
          defaultValue={action === 'Add' ? '' : product.description}
        />
        {errors.description && <SmallText title="Mô tả không đúng" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NumberTextInput
              placeholderText="Giảm giá"
              iconName="percent"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{ required: true, min: 0, max: 100 }}
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

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TouchableHighlight style={styles.pickerContainer}>
              <RNPickerSelect
                style={styles}
                onValueChange={onChange}
                placeholder={{
                  label: 'Chọn trạng thái',
                  value: '',
                }}
                value={value}
                items={statusList}
                useNativeAndroidPickerStyle={false}
              />
            </TouchableHighlight>
          )}
          rules={{ required: true }}
          name="status"
          defaultValue={action === 'Add' ? 'true' : product.status.toString()}
        />
        {errors.status && <SmallText title="Chưa chọn trạng thái" />}

        <BlueButton title="Chọn hình ảnh" pressed={pickImage} />
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
          style={styles.image}
          resizeMode="contain"
        />
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
            onOkPressed={handleSubmit(handleAddProduct)}
          >
            {alertBody()}
          </AdminAlert>
        ) : (
          <AdminAlert
            alertVisible={modalVisible}
            title="Chỉnh sửa sản phẩm"
            okTitle="Lưu"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleSubmit(handleSaveProduct)}
          >
            {alertBody()}
          </AdminAlert>
        )}
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
              onDeletePressed={() => {}}
            />
          );
        }}
        keyExtractor={(item: ProductItem) => item._id}
      />
    </CartLayout>
  );
};

export default AdminProduct;
