import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screen/home'
import Detail from '../screen/detail'
import Update from '../screen/update'

const Stack = createNativeStackNavigator();

export default function PlayerStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="List" component={Home} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Update" component={Update} />
        </Stack.Navigator>
    );
}