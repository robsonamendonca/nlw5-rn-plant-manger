import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    useColorScheme
} from 'react-native';
import { Header } from '../components/Header';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import { FlatList } from 'react-native-gesture-handler';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { pt } from 'date-fns/locale';
import { formatDistance } from 'date-fns';
import fonts from '../styles/fonts';
import { PlantCardSecundary } from '../components/PlantCardSecundary';
import { Load } from '../components/Load';
import { Alert } from 'react-native';
import { ButtonBack } from '../components/ButtonBack';
import { useNavigation } from '@react-navigation/native';

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<string>();

    const navigation = useNavigation();
    function handleMoveBack() {
        navigation.navigate('PlantSelect');
    }
    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`,
            [
                {
                    text: 'Não 😥',
                    style: 'cancel'
                },
                {
                    text: 'Sim 😎',
                    onPress: async () => {
                        try {

                            await removePlant(plant.id);

                            setMyPlants((oldData) => (
                                oldData.filter((item) => item.id !== plant.id)
                            ));

                        } catch (error) {
                            Alert.alert('Não foi possível remover 🤯!')
                        }
                    }

                }
            ])
    }

    useEffect(() => {
        async function loadStoreData() {
            const plantsStoreged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoreged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );
            setNextWaterd(
                `Não esqueça de regar a ${plantsStoreged[0].name} à ${nextTime}.`
            )

            setMyPlants(plantsStoreged);
            setLoading(false);

        }

        loadStoreData();
    }, [])



    if (loading)
        return <Load />

    return (

        <View style={styles.container}>

            <Header title='Minhas' subtitle='Plantinhas' />

            <View style={styles.spotLight}>
                <Image
                    source={waterdrop}
                    style={styles.spotLightImage}
                />
                <Text style={styles.spotLightText}>
                    {nextWaterd}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximos regadas
                    </Text>

                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecundary
                            data={item}
                            handleRemove={() => { handleRemove(item) }}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}
                />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 30,
        paddingTop: 8,
        backgroundColor: colors.background
    },
    spotLight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotLightImage: {
        width: 60,
        height: 60
    },
    spotLightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: 'justify'
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 22,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 7,
    },

})