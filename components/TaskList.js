import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, {useState, useEffect}from 'react'
import { useIsFocused }from '@react-navigation/native'

import TasksItem from './TasksItem';
import { getPersonaAll, getPersonaSi, deletePersona, activatePersona } from "../api";

const PersonaList = () => {

    const [persona, setPersona] = useState([])
    const [refresing, setRefresing] = useState(false);

    const isFocused = useIsFocused()

    const loadPersona = async () => {
        const data = await getPersonaAll()
        /* console.log(data) */
        setPersona(data)
    }

    useEffect(() => {
        loadPersona();
    }, [isFocused]);

    const handleDelete = async (cedula_per) =>{
        await deletePersona(cedula_per)
        await loadPersona()
    }

    const handleActivate = async (cedula_per) =>{
        await activatePersona(cedula_per)
        await loadPersona()
    }

    const renderItem = ({ item }) => {
        return <TasksItem persona={item} handleDelete={handleDelete} handleActivate={handleActivate}/>        
    }

    const onRefresh = React.useCallback(async () =>{
        setRefresing(true);
        await loadPersona();
        setRefresing(false);
    })

    return (
        <FlatList
        style={{width: 380}}
            data={persona}
            keyExtractor={(item) => item.cedula_per + ''}
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

export default PersonaList