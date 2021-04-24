import AsyncStorage from '@react-native-async-storage/async-storage';
import { processFontFamily } from 'expo-font';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import fotoImg from '../assets/robson.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
    const [usernName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStoregeUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }
        loadStoregeUserName();
        ;
    }, []);


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greenting}>Olá,</Text>
                <Text style={styles.userName}>
                    {usernName}
                </Text>
            </View>
            <Image source={fotoImg} style={styles.image} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 37
    },
    greenting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
});