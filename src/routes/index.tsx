import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Menu from '../app/menu';
import { Entypo } from 'react-native-vector-icons';
import Profile from '../app/profile';
import Login from '../app/auth/login';
import Register from '../app/auth/register';
import Product from '../app/product';

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
        </Scene>
      </Stack>
    </Router>
  );
};

export default Route;
