import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskList from './screens/TaskList';
import TaskForm from './screens/TaskForm';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TaskList" component={TaskList} options={{ title: 'Tarefas' }} />
        <Stack.Screen name="TaskForm" component={TaskForm} options={{ title: 'Nova Tarefa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
