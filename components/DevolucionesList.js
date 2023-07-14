import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, {useState, useEffect}from 'react'
import { useIsFocused }from '@react-navigation/native'

import DevolucionesItem from './DevolucionesItem';
import { getDevolucionesAll, getDevolucionesSi, deleteDevoluciones, activateDevoluciones } from "../api";

const DevolucionesList = () => {

    const [devoluciones, setDevoluciones] = useState([])
    const [refresing, setRefresing] = useState(false);

    const isFocused = useIsFocused()

    const loadDevoluciones = async () => {
        const data = await getDevolucionesAll()
        /* console.log(data) */
        setDevoluciones(data)
    }

    useEffect(() => {
        loadDevoluciones();
    }, [isFocused]);

    const handleDeleteDevoluciones = async (id_dev) =>{
        await deleteDevoluciones(id_dev)
        await loadDevoluciones()
    }

    const handleActivateDevoluciones = async (id_dev) =>{
        await activateDevoluciones(id_dev)
        await loadDevoluciones()
    }

    const renderItem = ({ item }) => {
        return <DevolucionesItem devoluciones={item} handleDeleteDevoluciones={handleDeleteDevoluciones} handleActivateDevoluciones={handleActivateDevoluciones}/>        
    }

    const onRefresh = React.useCallback(async () =>{
        setRefresing(true);
        await loadDevoluciones();
        setRefresing(false);
    })

    return (
        <FlatList
        style={{width: 380}}
            data={devoluciones}
            keyExtractor={(item) => item.id_dev + ''}
            renderItem={renderItem}
            refreshControl={
                <RefreshControl
                refreshing={refresing}
                colors={['#AF8A46']}
                onRefresh={onRefresh}
                progressBackgroundColor="#000"
                />
            }
        />
    )
}

export default DevolucionesList;