import React from 'react';
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import colors from '../styles/colors';
import { PlantSelect } from '../pages/PlantSelect';
import { MaterialIcons } from '@expo/vector-icons';
import { MyPlants } from '../pages/MyPlants';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return (
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'beside-icon',
                style: {
                    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
                    height: 48,
                },
            }} >

            <AppTab.Screen
                name="Nova Planta"
                component={PlantSelect}
                options={{
                    tabBarIcon: (({ focused, color, size }) => (
                        <MaterialIcons
                            name={focused ? "add-circle-outline" : "add-circle-outline"}
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

            <AppTab.Screen
                name="Minhas Plantinhas"
                component={MyPlants}
                options={{
                    tabBarIcon: (({ focused, color, size }) => (
                        <MaterialIcons
                            name={(focused) ? "format-list-bulleted" : "format-list-bulleted"}
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

        </AppTab.Navigator>

    )
}

export default AuthRoutes;