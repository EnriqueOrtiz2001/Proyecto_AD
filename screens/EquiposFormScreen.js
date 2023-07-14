import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from "react-native";

import Layout from "../components/Layout";
import { postEquipos, getEquipos, updateEquipos } from "../api";

const EquiposFormScreen = ({ navigation, route }) => {

    const [equipos, setEquipos] = useState({
        id_equ: "",
        nombre_equ: "",
        descripcion_equ: "",
        estado_equ: "",
        disponibilidad_equ: "",
    });

    const [editing, setEditing] = useState(false);
    const handleChangeEquipos = (name, value) => setEquipos({ ...equipos, [name]: value });

    const handleSubmit = async () => {
        try {
            if (!editing) {
                /* console.log(equipos) */
                await postEquipos(equipos);
            } else {
                await updateEquipos(route.params.id_equ, equipos);
            }
            navigation.navigate('EquiposScreen')
        } catch (error) {
            console.log(error)
        }
    };

    const [id_equ, setId] = useState("");
    const [nombre_equ, setNombre] = useState("");
    const [descripcion_equ, setDescripcion] = useState("");
    const [estado_equ, setEstado] = useState("");
    const [disponibilidad_equ, setDisponibilidad] = useState("");

    const [isButtonEnabled, setButtonEnabled] = useState(false);
    const [modalVisibleEstado, setModalVisibleEstado] = useState(false);
    const [modalVisibleDis, setModalVisibleDis] = useState(false);
    const [selectedOptionEstado, setSelectedOptionEstado] = useState("");
    const [selectedOptionDis, setSelectedOptionDis] = useState("");

    const handleOptionSelectEstado = (option) => {
        setSelectedOptionEstado(option);
        setEstado(option);
        setModalVisibleEstado(false);
        handleChangeEquipos("estado_equ", option);
        validateFields();
    };

    const handleOptionSelectDis = (option) => {
        setSelectedOptionDis(option);
        setDisponibilidad(option);
        setModalVisibleDis(false);
        handleChangeEquipos("disponibilidad_equ", option);
        validateFields();
    };

    useEffect(() => {
        validateFields();
    }, [
        id_equ,
        nombre_equ,
        descripcion_equ,
        estado_equ,
        disponibilidad_equ,
    ]);

    const validateInput = (text) => {
        const regex = /^[a-zA-Z]+$/;
        if (regex.test(text) || text === "") {
            return true;
        }
        return false;
    };

    const handleDescripcionChange = (text) => {
        if (validateInput(text)) {
            setDescripcion(text);
            handleChangeEquipos('descripcion_equ', text);
        }
    };

    const [contra, setContra] = useState(false);

    const validateFields = () => {
        const requiredFields = [
            nombre_equ,
            descripcion_equ,
            estado_equ,
            disponibilidad_equ,
        ];
        const isAnyFieldEmpty = requiredFields.some((field) => field === "");

        setButtonEnabled(!isAnyFieldEmpty && estado_equ !== "");

    };

    const renderIdWarning = () => {
        if (id_equ.length < 0) {
            return (
                <Text style={styles.warningText}>
                    El id se asigna automaticamente
                </Text>
            );
        }
        return null;
    };

    const renderNombreWarning = () => {
        if (nombre_equ.length < 5) {
            return (
                <Text style={styles.warningText}>
                    Ingrese un nombre valido, minimo 5 caracteres
                </Text>
            );
        }
        return null;
    };

    const renderDescripcionWarning = () => {
        if (descripcion_equ.length < 2) {
            return (
                <Text style={styles.warningText}>
                    Ingrese una descripcion valida, minimo 2 caracteres
                </Text>
            );
        }
        return null;
    };

    const renderEstadoWarning = () => {
        if (estado_equ.length < 1) {
            return (
                <Text style={styles.warningText}>
                    Seleccione el estado de la maquina
                </Text>
            );
        }
        return null;
    };

    const renderDisponibilidadWarning = () => {
        if (disponibilidad_equ < 1) {
            return (
                <Text style={styles.warningText}>
                    Seleccione la disponibilidad del equipo.
                </Text>
            );
        }
        return null;
    };

    useEffect(() => {
        if (route.params && route.params.id_equ) {
            navigation.setOptions({ headerTitle: 'Modificando un equipo' });
            setEditing(true);
            (async () => {
                const equipos = await getEquipos(route.params.id_equ);
                setEquipos({
                    id_equ: equipos.id_equ,
                    nombre_equ: equipos.nombre_equ,
                    descripcion_equ: equipos.descripcion_equ,
                    estado_equ: equipos.estado_equ,
                    disponibilidad_equ: equipos.disponibilidad_equ,
                })

                // Establecer los valores iniciales en los TextInput
                setId(equipos.id_equ);
                setNombre(equipos.nombre_equ);
                setDescripcion(equipos.descripcion_equ);
                setEstado(equipos.estado_equ);
                setDisponibilidad(equipos.disponibilidad_equ);

                // Comprobar los valores de los TextInput
                validateFields();
            })();
        }
    }, [])

    return (
        <ScrollView>
            <Layout>
                {
                    editing ? (<><TextInput
                        style={styles.input}
                        placeholder="Id Equipo"
                        placeholderTextColor="#000000"
                        value={equipos.id_equ.toString()}
                        onChangeText={(text) => {
                            setId(text);
                            handleChangeEquipos('id_equ', text);
                        }}
                        editable={route.params && route.params.id_equ ? false : false} // Desactivar edición
                    />
                    {renderIdWarning()}</>) : (null)
                }
                
                <TextInput
                    style={styles.input}
                    placeholder="Nombre Equipo"
                    placeholderTextColor="#000000"
                    value={equipos.nombre_equ}
                    onChangeText={(text) => {
                        setNombre(text);
                        handleChangeEquipos('nombre_equ', text);
                    }}
                    maxLength={25}
                />
                {renderNombreWarning()}
                <TextInput
                    style={styles.input}
                    placeholder="Descripcion Equipo"
                    placeholderTextColor="#000000"
                    value={equipos.descripcion_equ}
                    onChangeText={(text) => {
                        setDescripcion(text);
                        handleChangeEquipos('descripcion_equ', text);
                    }}
                    maxLength={25}
                />
                {renderDescripcionWarning()}
                <TextInput
                    style={styles.input}
                    placeholder="Estado Equipo"
                    placeholderTextColor="#000000"
                    value={equipos.estado_equ}
                    onChangeText={(text) => {
                        setEstado(text);
                        handleChangeEquipos('estado_equ', text);
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
                    placeholder="Disponibilidad Equipo"
                    placeholderTextColor="#000000"
                    value={equipos.disponibilidad_equ}
                    onChangeText={(text) => {
                        setDisponibilidad(text);
                        handleChangeEquipos('disponibilidad_equ', text);
                    }}
                    onFocus={() => setModalVisibleEstado(true)}
                    editable={false}
                />
                {renderDisponibilidadWarning()}

                <TouchableOpacity onPress={() => setModalVisibleDis(true)}>
                    <Text style={styles.buttonText}>Seleccionar Disponibilidad</Text>
                </TouchableOpacity>

                <Modal
                    visible={modalVisibleDis}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalVisibleDis(false)}
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ backgroundColor: "white", padding: 20, backgroundColor: "#AF8A46" }}>
                            <TouchableOpacity onPress={() => handleOptionSelectDis("Si")}>
                                <Text style={{ textAlign: "center", marginTop: 10, backgroundColor: "#EBBA5F" }}>Si</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleOptionSelectDis("No")}>
                                <Text style={{ textAlign: "center", marginTop: 30, marginBottom: 30, backgroundColor: "#EBBA5F" }}>No</Text>
                            </TouchableOpacity>
                            <Button title="Cerrar" onPress={() => setModalVisibleDis(false)} />
                        </View>
                    </View>
                </Modal>

                {
                    !editing ? (<TouchableOpacity disabled={!isButtonEnabled} onPress={handleSubmit}>
                        <Text style={[styles.buttonText, isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled]}>
                            Guardar Equipo
                        </Text>
                    </TouchableOpacity>) : (<TouchableOpacity disabled={!isButtonEnabled} onPress={handleSubmit}>
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

export default EquiposFormScreen;
