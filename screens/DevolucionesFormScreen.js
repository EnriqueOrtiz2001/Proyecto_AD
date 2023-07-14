import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from "react-native";

import Layout from "../components/Layout";
import { postEquipos, getDevoluciones, updateDevoluciones } from "../api";

const DevolucionesFormScreen = ({ navigation, route }) => {

    const [devoluciones, setDevoluciones] = useState({
        id_dev: "",
        id_cus: "",
        estado_dev: "",
        fecha_dev: "",
    });

    const [editing, setEditing] = useState(false);
    const handleChangeDevoluciones = (name, value) => setDevoluciones({ ...devoluciones, [name]: value });

    const handleSubmit = async () => {
        try {
            if (!editing) {
                /* console.log(equipos) */
                await postEquipos(devoluciones);
            } else {
                await updateDevoluciones(route.params.id_dev, devoluciones);
            }
            navigation.navigate('DevolucionesScreen')
        } catch (error) {
            console.log(error)
        }
    };

    const [id_dev, setIdDev] = useState("");
    const [id_cus, setIdCus] = useState("");
    const [estado_dev, setEstado] = useState("");
    const [fecha_dev, setFechaDev] = useState("");

    const [isButtonEnabled, setButtonEnabled] = useState(false);
    const [modalVisibleEstado, setModalVisibleEstado] = useState(false);
    const [selectedOptionEstado, setSelectedOptionEstado] = useState("");

    const handleOptionSelectEstado = (option) => {
        setSelectedOptionEstado(option);
        setEstado(option);
        setModalVisibleEstado(false);
        handleChangeDevoluciones("estado_dev", option);
        validateFields();
    };

    useEffect(() => {
        validateFields();
    }, [
        id_dev,
        id_cus,
        estado_dev,
        fecha_dev,
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
            id_dev,
            id_cus,
            estado_dev,
            fecha_dev,
        ];
        const isAnyFieldEmpty = requiredFields.some((field) => field === "");

        setButtonEnabled(!isAnyFieldEmpty && estado_dev !== "");

    };

    const renderEstadoWarning = () => {
        if (estado_dev.length < 1) {
            return (
                <Text style={styles.warningText}>
                    Seleccione el estado de la maquina devuelta
                </Text>
            );
        }
        return null;
    };

    useEffect(() => {
        if (route.params && route.params.id_dev) {
            navigation.setOptions({ headerTitle: 'Modificando un devolucion' });
            setEditing(true);
            (async () => {
                const devoluciones = await getDevoluciones(route.params.id_dev);
                setDevoluciones({
                    id_dev: devoluciones.id_dev,
                    id_cus: devoluciones.id_cus,
                    estado_dev: devoluciones.estado_dev,
                    fecha_dev: devoluciones.fecha_dev,
                })

                // Establecer los valores iniciales en los TextInput
                setIdDev(devoluciones.id_dev);
                setIdCus(devoluciones.id_cus);
                setEstado(devoluciones.estado_dev);
                setFechaDev(devoluciones.fecha_dev);

                // Comprobar los valores de los TextInput
                validateFields();
            })();
        }
    }, [])

    return (
        <ScrollView>
            <Layout>
                <TextInput
                    style={styles.input}
                    placeholder="Id Devolucion"
                    placeholderTextColor="#000000"
                    value={devoluciones.id_dev.toString()}
                    onChangeText={(text) => {
                        setIdDev(text);
                        handleChangeDevoluciones('id_dev', text);
                    }}
                    editable={route.params && route.params.id_dev ? false : false} // Desactivar edición
                />
                <TextInput
                    style={styles.input}
                    placeholder="Id Custodia"
                    placeholderTextColor="#000000"
                    value={devoluciones.id_cus.toString()}
                    onChangeText={(text) => {
                        setIdCus(text);
                        handleChangeDevoluciones('id_cus', text);
                    }}
                    editable={route.params && route.params.id_dev ? false : false} // Desactivar edición
                />
                <TextInput
                    style={styles.input}
                    placeholder="Estado Devolucion"
                    placeholderTextColor="#000000"
                    value={devoluciones.estado_dev}
                    onChangeText={(text) => {
                        setEstado(text);
                        handleChangeDevoluciones('estado_dev', text);
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
                            <TouchableOpacity onPress={() => handleOptionSelectEstado("Funcional")}>
                                <Text style={{ textAlign: "center", marginTop: 10, backgroundColor: "#EBBA5F" }}>Funcional</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleOptionSelectEstado("Dañado")}>
                                <Text style={{ textAlign: "center", marginTop: 30, marginBottom: 30, backgroundColor: "#EBBA5F" }}>Dañado</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleOptionSelectEstado("Bloqueado")}>
                                <Text style={{ textAlign: "center", marginTop: 10, marginBottom: 30, backgroundColor: "#EBBA5F" }}>Bloqueado</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleOptionSelectEstado("Mantenimiento")}>
                                <Text style={{ textAlign: "center", marginTop: 10, marginBottom: 30, backgroundColor: "#EBBA5F" }}>Mantenimiento</Text>
                            </TouchableOpacity>
                            <Button title="Cerrar" onPress={() => setModalVisibleEstado(false)} />
                        </View>
                    </View>
                </Modal>

                <TextInput
                    style={styles.input}
                    placeholder="Fecha Devolucion"
                    placeholderTextColor="#000000"
                    value={devoluciones.fecha_dev}
                    onChangeText={(text) => {
                        setFechaDev(text);
                        handleChangeDevoluciones('fecha_dev', text);
                    }}
                    editable={route.params && route.params.id_dev ? false : false} // Desactivar edición
                />
                {
                    !editing ? (null) : (<TouchableOpacity disabled={!isButtonEnabled} onPress={handleSubmit}>
                        <Text style={[styles.buttonText, isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled]}>
                            Actualizar Equipo
                        </Text>
                    </TouchableOpacity>)
                }

                {
                    !editing ? (<TouchableOpacity>
                        <Text style={styles.buttonText}>Limpiar</Text>
                    </TouchableOpacity>) : (null)
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

export default DevolucionesFormScreen;
