import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, {useState, useEffect}from 'react'
import { useIsFocused }from '@react-navigation/native'

import SolicitudesItem from './SolicitudesItem';
import { getSolicitudesAll, getSolicitudesSi, deleteSolicitudes, activateSolicitudes } from "../api";

const SolicitudesList = () => {

    const [solicitudes, setSolicitudes] = useState([])
    const [refresing, setRefresing] = useState(false);

    const isFocused = useIsFocused()

    const loadSolicitudes = async () => {
        const data = await getSolicitudesAll()
        /* console.log(data)*/
        setSolicitudes(data)
    }

    useEffect(() => {
        loadSolicitudes();
    }, [isFocused]);

    const handleDeleteSolicitudes = async (id_sol) =>{
        await deleteSolicitudes(id_sol)
        await loadSolicitudes()
    }

    const handleActivateSolicitudes = async (id_sol) =>{
        await activateSolicitudes(id_sol)
        await loadSolicitudes()
    }

    const renderItem = ({ item }) => {
        return <SolicitudesItem solicitudes={item} handleDeleteSolicitudes={handleDeleteSolicitudes} handleActivateSolicitudes={handleActivateSolicitudes}/>        
    }

    const onRefresh = React.useCallback(async () =>{
        setRefresing(true);
        await loadSolicitudes();
        setRefresing(false);
    })

    return (
        <FlatList
        style={{width: 380}}
            data={solicitudes}
            keyExtractor={(item) => item.id_sol + ''}
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

export default SolicitudesList;