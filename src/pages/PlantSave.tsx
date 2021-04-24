import React, { useEffect } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity,
    Touchable
} from 'react-native';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import { useRoute } from '@react-navigation/core';
import DataTimePicker, { Event } from '@react-native-community/datetimepicker';

import waterdrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useState } from 'react';
import { format, isBefore } from 'date-fns';
import { loadPlant, PlantProps, savePlant } from '../libs/storage';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { ButtonBack } from '../components/ButtonBack';

interface Params {
    plant: PlantProps
}

export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
    const navigation = useNavigation();

    const route = useRoute();
    const { plant } = route.params as Params;

    function handleMoveBack() {
        navigation.navigate('PlantSelect');
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState);
    }

    function handelChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker(oldState => !oldState);
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰')
        }

        if (dateTime)
            setSelectedDateTime(dateTime);
    }


    async function handleSave() {

        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique, tranquilo que sempre vamos lembrar você de cuidar das suas plantinhas com mutio cuidado.',
                buttonTitle: 'Muito obrigado 🤙🏼',
                icon: 'hug',
                nextScreen: 'MyPlants'
            });

        } catch {
            Alert.alert('Não foi possível salvar! 🚨')
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <ButtonBack handleMoveBack={handleMoveBack} />

            <View style={styles.container}>

                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={88}
                        width={78}
                    />

                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>

                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>

                </View>

                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterdrop}
                            style={styles.tipIamge}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>

                    <Text style={styles.alertLabel}>
                        Escolha o melhor horario para ser lembrado:
                    </Text>


                    {showDatePicker && (
                        <DataTimePicker
                            value={selectedDateTime}
                            mode="time"
                            display="default"
                            style={styles.dataTimePicker}
                            onChange={handelChangeTime}
                        />
                    )}

                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity
                                style={styles.dataTimePickerButton}
                                onPress={handleOpenDateTimePickerForAndroid}>
                                <Text style={styles.dataTimePickerText}>
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )
                    }

                    <Button
                        title="Confirmar alterações"
                        onPress={handleSave}
                    />

                </View>


            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 3,
        paddingBottom: getBottomSpace() || 5
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 5,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 5,
        marginBottom: 5
    }
    ,
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',

    }
    , tipIamge: {
        width: 64,
        height: 64,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 17,
        marginTop: 5,
    },
    dataTimePicker: {
        height: 128
    },
    dataTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 25
    },
    dataTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
    ,
})