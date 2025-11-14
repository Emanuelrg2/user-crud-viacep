import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListUsers from '../screens/ListUsers';
import UserForm from '../screens/UserForm';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="ListUsers">
      <Stack.Screen name="ListUsers" component={ListUsers} options={{ title: 'Usuários' }} />
      <Stack.Screen name="UserForm" component={UserForm} options={{ title: 'Cadastro / Edição' }} />
    </Stack.Navigator>
  );
}
