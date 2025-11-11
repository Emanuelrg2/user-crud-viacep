//Emanuel Ramos Gomes
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListUsers from './src/screens/ListUsers';
import UserForm from './src/screens/UserForm';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListUsers">
        <Stack.Screen
          name="ListUsers"
          component={ListUsers}
          options={{ title: 'Usuários Cadastrados' }}
        />
        <Stack.Screen
          name="UserForm"
          component={UserForm}
          options={{ title: 'Cadastro/Edição de Usuário' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}