import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps {
    icon?: any;
    handleMoveBack: () => void;
}

export function ButtonBack({ icon = "chevron-left", handleMoveBack, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleMoveBack}
        >

            <Feather
                name={icon}
                style={styles.buttonIcon}
            />

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height: 40,
        width: 40,
        marginTop: getStatusBarHeight(),
    },
    buttonIcon: {
        fontSize: 28,
        color: colors.heading,
    }

});