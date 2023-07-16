import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, {useState, useEffect}from 'react'
import { useIsFocused }from '@react-navigation/native'

import EquiposItem from './EquiposItem';
import { getEquiposAll, getEquiposSi, deleteEquipos, activateEquipos } from "../api";

const EquiposList = () => {

    const [equipos, setEquipos] = useState([])
    const [refresing, setRefresing] = useState(false);

    const isFocused = useIsFocused()

    const loadEquipos = async () => {
        const data = await getEquiposSi()
        /* console.log(data) */
        setEquipos(data)
    }

    useEffect(() => {
        loadEquipos();
    }, [isFocused]);

    const handleDeleteEquipos = async (id_equ) =>{
        await deleteEquipos(id_equ)
        await loadEquipos()
    }

    const handleActivateEquipos = async (id_equ) =>{
        await activateEquipos(id_equ)
        await loadEquipos()
    }

    const renderItem = ({ item }) => {
        return <EquiposItem equipos={item} handleDeleteEquipos={handleDeleteEquipos} handleActivateEquipos={handleActivateEquipos}/>        
    }

    const onRefresh = React.useCallback(async () =>{
        setRefresing(true);
        await loadEquipos();
        setRefresing(false);
    })

    return (
        <FlatList
        style={{width: 380}}
            data={equipos}
            keyExtractor={(item) => item.id_equ + ''}
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

export default EquiposList;