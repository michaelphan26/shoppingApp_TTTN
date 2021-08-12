import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api_url } from "./constant";

export const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const phoneReg = /((09|03|07|08|05)+([0-9]{8})\b)/g;

export interface ProductItem{
    _id: string;
    name: string;
    brand: string;
    id_category: string;
    price: number;
    description: string;
  stock: number;
    image: string;
    discount: number;
    status:boolean
}

export interface CategoryItem{
    _id: string;
    name:string
}

export interface CartItem{
  id_product: string;
  price: number;
  discount: number;
  quantity:number
}

export interface UserInfo {
  name: string;
  phone: string;
  address: string;
}

export interface CartInterface{
  productList: [],
  total:number
}

export interface ReceiptInterface{
  _id: string,
  date: string,
  total: number,
  email: string,
  id_receiptType: string,
}

export interface ReceiptDetailInterface{
  _id: string,
  discount: number,
  id_product: string,
  id_receipt: string,
  price: number,
  quantity: number
}

export interface SummaryInterface{
  id:string,
  title: string,
  count:number
}

export const getCartFromAPI = async ()=>{
  const token = await AsyncStorage.getItem("@token");
  let cart = {} as CartInterface
  if (token) {
    axios({
      url: 'receipt/get-cart',
      baseURL: `${api_url}`,
      method: 'get',
      headers: {
        "x-auth-token":token  
        },
      responseType:'json'
    }).then(res => {
      if (res.data['code'] === 200) {
        cart = res.data['data'];
      }
      else {
        return res.data['message'] as string;
      }
    }).catch(err => {
      return err.response.data['message'] as string
    })
    return cart
  } else {
    return "No token";
  }
}

export async function addReceiptAPI(cart:CartInterface) {
  const token = await AsyncStorage.getItem("@token");
  if (token) {
    axios({
      url: 'receipt/add-receipt',
      baseURL: `${api_url}`,
      method: 'post',
      headers: {
        "x-auth-token":token  
      },
      data:cart,
      responseType:'json'
    }).then(res => {
      if (res.data['code'] !== 200) {
        return res.data['message'] as string;
      }
    }).catch(err => {
      return err.response.data['message'] as string
    })
  }
}

export async function getUserInfoFromAPI() {
  const token = await AsyncStorage.getItem('@token');
  if (token) {
    let userInfo = {} as UserInfo;
    await axios({
      url: '/user/me',
      baseURL: `${api_url}`,
      method: 'get',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          userInfo=res.data['data']
        }
        else {
          return res.data['message'] as string;
        }
      })
      .catch((err) => {
        return err.response.data['message'] as string
      });
    return userInfo;
  }
  else {
    const msg = "No token";
    return msg;
      }
}

export async function getCategoryNameFromAPI(product:ProductItem){
  let categoryName = '';
    await axios({
      url: `category/get-name/${product.id_category}`,
      baseURL: `${api_url}`,
      method: 'get',
    }).then((res) => {
      if (res.data['code'] === 200) {
        categoryName = res.data['data'].name;
      }
      else {
        return categoryName;
      }
    }).catch(err => {
      return categoryName;
    });
  return categoryName;
}

export async function getProductListFromAPI() {
  let productList= [] as any;
  await axios({
      url: `/product/product-list`,
      baseURL: `${api_url}`,
      method: 'get',
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
           productList=res.data['data'];
        }
        else {
          return res.data['message']
        }
      })
      .catch((err) => {
        return err.response.data['message'];
      });
  return productList
}

export async function getCategoryListFromAPI() {
  let categoryList = [] as any;
  await axios({
      url: '/category/category-list',
      method: 'get',
      baseURL: `${api_url}`,
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          categoryList = res.data['data'];
        }
        else { return res.data['message'] }
      })
      .catch((err) => {
        return err.response.data['message']
      });
  return categoryList;
}

export async function getProductByCategoryFromAPI(id_category:string) {
  let productList = [] as any;
  await axios({
      url: `/category/get-product-list/${id_category}`,
      baseURL: `${api_url}`,
      method: 'get',
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          productList=res.data['data']
        }
        else {
          return res.data['message'];
        }
      })
      .catch((err) => {
        return err.response.data['message'];
      });
  return productList;
}

export async function getReceiptListFromAPI() {
  const token = await AsyncStorage.getItem("@token");
  let receiptList = [] as any;
  await axios({
    url: 'receipt/receipt-list',
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      receiptList = res.data['data'] as ReceiptInterface;
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })

  return receiptList;
}

export async function getReceiptDetailFromAPI(_id:string){
const token = await AsyncStorage.getItem("@token");
  let receiptDetailList = [] as any;
  await axios({
    url: `receipt/receipt-detail/${_id}`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      receiptDetailList = res.data['data'];
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })

  return receiptDetailList;
}

export async function getProductDetailFromAPI(_id:string) {
  let productDetail = {} as ProductItem;
  await axios({
    url: `product/product-detail/${_id}`,
    baseURL: `${api_url}`,
    method: 'get',
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      productDetail = res.data['data'];
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })

  return productDetail;
}

export async function addCategory(name: string) {
  const token = await AsyncStorage.getItem("@token")
  let code:number=0
  await axios({
    url: 'category/add-category',
    baseURL: `${api_url}`,
    method: 'post',
    headers: {
      "x-auth-token":token
    },
    data: {
      "name":name
    }
  }).then(res => {
    code = res.data['code'] as number;
    return code
  })
    .catch(err => {
      code = err.response.data['code'] as number
      return code
    })
  return code
}

export async function deleteCategory(item: CategoryItem) {
  const token = await AsyncStorage.getItem("@token")
  let code:number=0
  await axios({
    url: `category/delete-category/${item._id}`,
    baseURL: `${api_url}`,
    method: 'delete',
    headers: {
      "x-auth-token":token
    },
  }).then(res => {
    code = res.data['code'] as number;
    return code
  })
    .catch(err => {
      code = err.response.data['code'] as number
      return code
    })
  return code
}