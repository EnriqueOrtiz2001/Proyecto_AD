import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, Button, Alert } from "react-native";

import Layout from "../componentsWeb/Layout";
import { postSolicitudes, getSolicitudes, updateSolicitudes } from "../api";

import { CedulaContext } from '../componentsWeb/CedulaContext';

const SolicitudesFormScreen = ({ navigation, route }) => {

    const { cedulaGlobal } = useContext(CedulaContext);

    const [solicitudes, setSolicitudes] = useState({
        id_sol: "",
        cedula_per: "",
        id_equ: route.params.id_equ,
        estado_sol: "",
        observaciones_sol: "",
    });

    const [editing, setEditing] = useState(false);
    const handleChangeSolicitudes = (name, value) => setSolicitudes({ ...solicitudes, [name]: value });

    const handleSubmit = async () => {
        try {
            if (!editing) {
                await postSolicitudes(solicitudes);
            } else {
                await updateSolicitudes(route.params.id_sol, solicitudes);
            }
            navigation.navigate('SolicitudesScreen')
        } catch (error) {
            if (error.response && error.response.status === 45000) {
                Alert.alert("Error", "No es posible actualizar la solicitud porque el equipo está ocupado.");
            } else if (error.response && error.response.status === 404) {
                Alert.alert("Error", "La cédula no se encuentra en la base de datos.");
            } else {
                Alert.alert("Error", "Ocurrió un error al procesar la solicitud.");
            }
        }
    };


    const [id_sol, setIdSol] = useState("");
    const [cedula_per, setCedula] = useState("");
    const [id_equ, setIdEqu] = useState(route.params.id_equ);
    const [estado_sol, setEstado] = useState("");
    const [observaciones_sol, setObservaciones] = useState("");

    const [isButtonEnabled, setButtonEnabled] = useState(false);
    const [modalVisibleEstado, setModalVisibleEstado] = useState(false);
    const [selectedOptionEstado, setSelectedOptionEstado] = useState("");

    const handleOptionSelectEstado = (option) => {
        setSelectedOptionEstado(option);
        setEstado(option);
        setModalVisibleEstado(false);
        handleChangeSolicitudes("estado_sol", option);
        validateFields();
    };

    useEffect(() => {
        validateFields();
    }, [
        id_sol,
        cedula_per,
        id_equ,
        estado_sol,
        observaciones_sol,
    ]);

    const validateInput = (text) => {
        const regex = /^[a-zA-Z]+$/;
        if (regex.test(text) || text === "") {
            return true;
        }
        return false;
    };

    const validateFields = () => {
        const requiredFields = [
            cedula_per,
            id_equ,
        ];
        const isAnyFieldEmpty = requiredFields.some((field) => field === "");
        const isCedulaValid = cedula_per.length === 10;

        setButtonEnabled(!isAnyFieldEmpty && isCedulaValid);

    };

    const renderIdSolWarning = () => {
        if (id_sol.length < 1) {
            return (
                <Text style={styles.warningText}>
                    El id se asigna automaticamente
                </Text>
            );
        }
        return null;
    };

    const renderCedulaWarning = () => {
        if (cedula_per.length < 10) {
            return (
                <Text style={styles.warningText}>
                    La cedula tiene que tener 10 digitos.
                </Text>
            );
        }
        return null;
    };

    const renderIdEquWarning = () => {
        if (id_equ.length < 1) {
            return (
                <Text style={styles.warningText}>
                    Ingrese un id existente
                </Text>
            );
        }
        return null;
    };

    const renderEstadoWarning = () => {
        if (estado_sol.length < 1) {
            return (
                <Text style={styles.warningText}>
                    Seleccione el estado de la maquina
                </Text>
            );
        }
        return null;
    };

    const renderObservacionesWarning = () => {
        if (observaciones_sol.length < 4) {
            return (
                <Text style={styles.warningText}>
                    Ingrese una observacion valida, minimo 4 caracteres
                </Text>
            );
        }
        return null;
    };

    useEffect(() => {
        if (route.params && route.params.id_sol) {
            navigation.setOptions({ headerTitle: 'Modificando una solicitud' });
            setEditing(true);
            (async () => {
                const solicitudes = await getSolicitudes(route.params.id_sol);
                setSolicitudes({
                    id_sol: solicitudes.id_sol,
                    cedula_per: solicitudes.cedula_per,
                    id_equ: solicitudes.id_equ,
                    estado_sol: solicitudes.estado_sol,
                    observaciones_sol: solicitudes.observaciones_sol,
                })

                // Establecer los valores iniciales en los TextInput
                setIdSol(solicitudes.id_sol);
                setCedula(solicitudes.cedula_per);
                setIdEqu(route.params.id_equ);
                setEstado(solicitudes.estado_sol);
                setObservaciones(solicitudes.observaciones_sol);

                // Comprobar los valores de los TextInput
                validateFields();
            })();
        }
    }, [])

    useEffect(() => {
        if (route.params && route.params.id_equ) {
            setIdEqu(route.params.id_equ);
            handleChangeSolicitudes('id_equ', route.params.id_equ);
        }
    }, []);

    useEffect(() => {
        if (route.params && cedulaGlobal) {
            setCedula(cedulaGlobal);
            handleChangeSolicitudes('cedula_per', cedulaGlobal);
        }
    }, []);

    console.log(cedula_per)
    console.log(route.params.id_equ)

    return (
        <ScrollView>
            <Layout>

                {
                    editing ? (<><TextInput
                        style={styles.input}
                        placeholder="Id Solicitud"
                        placeholderTextColor="#000000"
                        value={solicitudes.id_sol.toString()}
                        onChangeText={(text) => {
                            setId(text);
                            handleChangeEquipos('id_sol', text);
                        }}
                        editable={route.params && route.params.id_sol ? false : false} // Desactivar edición
                    />
                        {renderIdSolWarning()}</>) : (null)
                }

                <TextInput
                    style={styles.input}
                    placeholder="Cedula Persona"
                    placeholderTextColor="#000000"
                    value={cedulaGlobal}
                    onChangeText={(text) => {
                        setCedula(text);
                        handleChangeSolicitudes('cedula_per', text);
                    }}
                    maxLength={10}
                    keyboardType="numeric" // Permitir solo entrada numérica
                    editable={route.params && route.params.id_sol ? false : false}
                />
                {renderCedulaWarning()}
                <TextInput
                    style={styles.input}
                    placeholder="Id Equipo"
                    placeholderTextColor="#000000"
                    value={route.params.id_equ}
                    onChangeText={(text) => {
                        setIdEqu(route.params.id_equ);
                        handleChangeSolicitudes('id_equ', text);
                    }}
                    maxLength={10}
                    editable={route.params && route.params.id_sol ? false : false}
                />
                {renderIdEquWarning()}

                {
                    editing ? (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Estado Solicitud"
                                placeholderTextColor="#000000"
                                value={solicitudes.estado_sol}
                                onChangeText={(text) => {
                                    setEstado(text);
                                    handleChangeEquipos('estado_sol', text);
                                }}
                                onFocus={() => setModalVisibleEstado(true)}
                                editable={false}
                            />
                            {renderEstadoWarning()}
                            <TouchableOpacity onPress={() => setModalVisibleEstado(true)}>
                                <Text style={styles.buttonText}>Seleccionar Estado</Text>
                            </TouchableOpacity>
                            <Modal
                                visible={modalVisibleEstado}
                                animationType="slide"
                                transparent={true}
                                onRequestClose={() => setModalVisibleEstado(false)}
                            >
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "white", padding: 20, backgroundColor: "#AF8A46" }}>
                                        <TouchableOpacity onPress={() => handleOptionSelectEstado("Aprobado")}>
                                            <Text style={{ textAlign: "center", marginTop: 10, backgroundColor: "#EBBA5F" }}>Aprobado</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleOptionSelectEstado("Rechazado")}>
                                            <Text style={{ textAlign: "center", marginTop: 30, marginBottom: 30, backgroundColor: "#EBBA5F" }}>Rechazado</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleOptionSelectEstado("Pendiente")}>
                                            <Text style={{ textAlign: "center", marginTop: 10, marginBottom: 30, backgroundColor: "#EBBA5F" }}>Pendiente</Text>
                                        </TouchableOpacity>
                                        <Button title="Cerrar" onPress={() => setModalVisibleEstado(false)} />
                                    </View>
                                </View>
                            </Modal>
                        </>
                    ) : null
                }

                {
                    editing ? (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Observacion Solicitud"
                                placeholderTextColor="#000000"
                                value={solicitudes.observaciones_sol}
                                onChangeText={(text) => {
                                    setObservaciones(text);
                                    handleChangeSolicitudes('observaciones_sol', text);
                                }}
                                maxLength={50}
                            />
                            {renderObservacionesWarning()}
                        </>
                    ) : null
                }

                {
                    !editing ? (<TouchableOpacity disabled={!isButtonEnabled} onPress={handleSubmit}>
                        <Text style={[styles.buttonText, isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled]}>
                            Guardar Solicitud
                        </Text>
                    </TouchableOpacity>) : (<TouchableOpacity disabled={!isButtonEnabled} onPress={handleSubmit}>
                        <Text style={[styles.buttonText, isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled]}>
                            Actualizar Solicitud
                        </Text>
                    </TouchableOpacity>)
                }
            </Layout>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 15,
        marginTop: 20,
        borderWidth: 3,
        borderColor: "#AF8A46",
    },
    buttonText: {
        backgroundColor: "#AF8A46",
        
        marginTop: 10,
        padding: 15,
        color: "#fff",
        textAlign: "center",
        width: 330,
    },
    buttonEnabled: {
        opacity: 1,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    warningText: {
        color: "red",
        fontSize: 12,
    },
});

export default SolicitudesFormScreen;
