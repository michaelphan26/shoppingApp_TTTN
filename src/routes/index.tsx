import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Menu from '../app/menu';
import { Entypo } from 'react-native-vector-icons';
import Profile from '../app/profile';
import Login from '../app/auth/login';

const Route = () => {
  return (
    <Router>
      <Stack>
        <Scene key="root" hideNavBar={true}>
          <Scene key="login" hideNavBar={true} component={Login} initial />
          <Scene key="menu" hideNavBar={true} component={Menu} />
        </Scene>
      </Stack>
    </Router>
  );
};

export default Route;
