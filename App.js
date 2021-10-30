import React from 'react';
import HomeScreen from './views/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EmployeeFormScreen from './views/screens/EmployeeFormScreen';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './logic/store';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { DrawerContent } from './views/components/DrawerContent';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
    accent: 'green',
  },
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen name='Home' component={HomeScreen} />
            <Drawer.Screen
              name='Employee'
              component={EmployeeFormScreen}
              initialParams={{ id: null }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}
