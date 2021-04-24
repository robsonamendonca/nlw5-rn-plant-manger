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
import iconImg from '../assets/icon.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { RectButtonProps } from 'react-native-gesture-handler';

interface HeaderProps extends RectButtonProps {
    title?: string;
    subtitle?: string;
}

export function Header({ title = '', subtitle = '', ...rest }: HeaderProps) {
    const [userName, setUserName] = useState<string>();

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
                <Text style={styles.greenting}>
                    {(title === '') ? 'Olá,' : title}</Text>
                <Text style={styles.userName}>
                    {(subtitle === '') ? userName : subtitle}
                </Text>
            </View>
            <Image source={(userName === 'Robson!') ? fotoImg : iconImg} style={styles.image} />
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