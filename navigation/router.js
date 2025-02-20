import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PlayerStack from './playerStack'
import Add from '../screen/add'
const Tabs = createBottomTabNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tabs.Navigator>
                <Tabs.Screen name="Home" component={PlayerStack} options={{ headerShown: false}}/>
                <Tabs.Screen name="Add" component={Add} />
            </Tabs.Navigator>
        </NavigationContainer>
    )
}