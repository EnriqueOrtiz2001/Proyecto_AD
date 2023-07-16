import { FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect, useContext }from 'react'
import { useIsFocused }from '@react-navigation/native'

import CustodiaItem from './CustodiaItem';
import { getBuscarPersonaCustodia, deleteCustodia} from "../api";


import { CedulaContext } from './CedulaContext';

const CustodiaList = () => {

    const { cedulaGlobal } = useContext(CedulaContext);

    const [custodia, setCustodia] = useState([])
    const [refresing, setRefresing] = useState(false);

    const isFocused = useIsFocused()

    const loadCustodia = async () => {
        const data = await getBuscarPersonaCustodia(cedulaGlobal)
        /* console.log(data) */
        setCustodia(data)
    }

    useEffect(() => {
        loadCustodia();
    }, [isFocused]);

    const handleDeleteCustodia = async (id_cus) =>{
        await deleteCustodia(id_cus)
        await loadCustodia()
    }

    const renderItem = ({ item }) => {
        return <CustodiaItem custodia={item} handleDeleteCustodia={handleDeleteCustodia}/>        
    }

    const onRefresh = React.useCallback(async () =>{
        setRefresing(true);
        await loadCustodia();
        setRefresing(false);
    })

    return (
        <FlatList
        style={{width: 380}}
            data={custodia}
            keyExtractor={(item) => item.id_cus + ''}
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

export default CustodiaList;