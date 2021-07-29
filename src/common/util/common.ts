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