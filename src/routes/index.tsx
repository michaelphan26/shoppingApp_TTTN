import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Menu from '../app/menu';
import Profile from '../app/profile';
import Login from '../app/auth/login';
import Register from '../app/auth/register';
import Product from '../app/product';
import Cart from '../app/cart';
import ChangePassword from '../app/auth/changePassword';
import Receipt from '../app/receipt';
import ReceiptDetail from '../app/receipt-detail';
import AdminMenu from '../app/admin/menu';
import AdminProduct from '../app/admin/product';
import AdminCategory from '../app/admin/category';
import AdminCompany from '../app/admin/company';
import AdminIOProduct from '../app/admin/ioProduct';
import AdminIOType from '../app/admin/ioType';
import AdminReceipt from '../app/admin/receipt';
import AdminReceiptType from '../app/admin/receiptType';
import AdminRole from '../app/admin/role';
import AdminUser from '../app/admin/user';
import AdminIOProductDetail from '../app/admin/ioProductDetail';

const Route = () => {
  return (
    <Router>
      <Stack>
        <Scene key="root" hideNavBar={true}>
          <Scene key="login" hideNavBar={true} component={Login} />
          <Scene key="menu" hideNavBar={true} component={Menu} initial />
          <Scene key="register" hideNavBar={true} component={Register} />
          <Scene key="profile" hideNavBar={true} component={Profile} />
          <Scene key="product" hideNavBar={true} component={Product} />
          <Scene key="cart" hideNavBar={true} component={Cart} />
          <Scene
            key="changePassword"
            hideNavBar={true}
            component={ChangePassword}
          />
          <Scene key="receipt" hideNavBar={true} component={Receipt} />
          <Scene
            key="receiptDetail"
            hideNavBar={true}
            component={ReceiptDetail}
          />

          <Scene key="adminMenu" hideNavBar={true} component={AdminMenu} />
          <Scene key="adminAccount" hideNavBar={true} component={AdminUser} />
          <Scene
            key="adminCategory"
            hideNavBar={true}
            component={AdminCategory}
          />
          <Scene
            key="adminProduct"
            hideNavBar={true}
            component={AdminProduct}
          />
          <Scene
            key="adminCompany"
            hideNavBar={true}
            component={AdminCompany}
          />
          <Scene
            key="adminIOProduct"
            hideNavBar={true}
            component={AdminIOProduct}
          />
          <Scene
            key="adminIOProductDetail"
            hideNavBar={true}
            component={AdminIOProductDetail}
          />
          <Scene key="adminIOType" hideNavBar={true} component={AdminIOType} />
          <Scene
            key="adminReceipt"
            hideNavBar={true}
            component={AdminReceipt}
          />
          <Scene
            key="adminReceiptType"
            hideNavBar={true}
            component={AdminReceiptType}
          />
          <Scene key="adminRole" hideNavBar={true} component={AdminRole} />
        </Scene>
      </Stack>
    </Router>
  );
};

export default Route;
