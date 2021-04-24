import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { PlaceButton } from '../components/PlaceButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantProps } from '../libs/storage';

interface PlaceProps {
    key: string;
    title: string;
}

export function PlantSelect() {
    const [places, setPlaces] = useState<PlaceProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setfilteredPlants] = useState<PlantProps[]>([]);
    const [placeSelected, setPlaceSelected] = useState<string>('all');

    const [loading, setLoading] = useState(true);


    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(true);

    const navigation = useNavigation();
    function handlePlantSelct(plant: PlantProps) {
        navigation.navigate('PlantSave', { plant });
    }


    function handleFetchMore(distance: number) {
        if (distance < 1)
            return;

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }


    function handlePlaceSelected(place: string) {
        setPlaceSelected(place);

        if (place === 'all')
            return setfilteredPlants(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(place)
        );

        setfilteredPlants(filtered);


    }

    async function fetchPlace() {
        const { data } = await api
            .get(`plants_environments?_sort=title&_order=asc`);
        setPlaces([
            {
                key: 'all',
                title: 'Todos',
            },

            ...data]);

        setPlaceSelected('all');
    }


    async function fetchPlants() {
        const { data } = await api
            .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if (!data)
            return setLoading(true);

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setfilteredPlants(oldValue => [...oldValue, ...data])

        } else {
            setPlants(data);
            setfilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }


    useEffect(() => {
        try {
            fetchPlace();
        } catch {
            Alert.alert('Não foi possível carregar! 🚨')
        }

    }, [])

    useEffect(() => {
        fetchPlants();
    }, [])


    if (loading)
        return <Load />
    return (
        <View style={styles.container}>
            <View style={styles.header}>


                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>

                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>
            </View>

            <View>
                <FlatList
                    data={places}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={
                        ({ item }) => (
                            <PlaceButton
                                title={item.title}
                                active={item.key === placeSelected}
                                onPress={() => handlePlaceSelected(item.key)}
                            />
                        )
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.placeList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={
                        ({ item }) => (
                            <PlantCardPrimary
                                data={item}
                                onPress={() => { handlePlantSelct(item) }}
                            />
                        )
                    }
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) =>
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore
                            ? <ActivityIndicator color={colors.green} />
                            : <></>
                    }
                    contentContainerStyle={styles.contentContainerStyle}
                />
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background

    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    placeList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
    contentContainerStyle: {

    }

});