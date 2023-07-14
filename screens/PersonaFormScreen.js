import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from "react-native";

import Layout from "../components/Layout";
import { postPersona, getPersona, updatePersona } from "../api";

const PersonaFormScreen = ({ navigation, route }) => {

  const [persona, setPersona] = useState({
    cedula_per: "",
    contrasenia_per: "",
    conf_contrasenia: "",
    nombre_per: "",
    apellido_per: "",
    telefono_per: "",
    correo_per: "",
    direccion_per: "",
    rol_per: "",
  });

  const [editing, setEditing] = useState(false);
  const handleChangePersona = (name, value) => setPersona({ ...persona, [name]: value });

  const handleSubmit = async () => {
    try {
      if (!editing) {
        /* console.log(persona) */
        await postPersona(persona);
      } else {
        await updatePersona(route.params.cedula_per, persona);
      }
      navigation.navigate('PersonaScreen')
    } catch (error) {
      console.log(error)
    }
  };

  const [cedula_per, setCedula] = useState("");
  const [contrasenia_per, setContrasenia] = useState("");
  const [conf_contrasenia, setConf_contrasenia] = useState("");
  const [nombre_per, setNombre] = useState("");
  const [apellido_per, setApellido] = useState("");
  const [telefono_per, setTelefono] = useState("");
  const [correo_per, setCorreo] = useState("");
  const [direccion_per, setDireccion] = useState("");
  const [rol_per, setRol] = useState("");
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setRol(option);
    setModalVisible(false);
    handleChangePersona("rol_per", option);
    validateFields();
  };

  useEffect(() => {
    validateFields();
  }, [
    cedula_per,
    contrasenia_per,
    conf_contrasenia,
    nombre_per,
    apellido_per,
    telefono_per,
    correo_per,
    direccion_per,
    rol_per,
  ]);

  const validateInput = (text) => {
    const regex = /^[a-zA-Z]+$/;
    if (regex.test(text) || text === "") {
      return true;
    }
    return false;
  };

  const handleNombreChange = (text) => {
    if (validateInput(text)) {
      setNombre(text);
      handleChangePersona('nombre_per', text);
    }
  };

  const handleApellidoChange = (text) => {
    if (validateInput(text)) {
      setApellido(text);
      handleChangePersona('apellido_per', text);
    }
  };

  const [contra, setContra] = useState(false);

  const validateFields = () => {
    const requiredFields = [
      cedula_per,
      contrasenia_per,
      conf_contrasenia,
      nombre_per,
      apellido_per,
      telefono_per,
      correo_per,
      direccion_per,
      rol_per,
    ];
    const isAnyFieldEmpty = requiredFields.some((field) => field === "");
    const isCedulaValid = cedula_per.length === 10;

    const isContraseniaValid = contrasenia_per === conf_contrasenia;

    setButtonEnabled(!isAnyFieldEmpty && isCedulaValid && rol_per !== "" && isContraseniaValid);

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

  const renderContraseniaWarning = () => {
    if (contrasenia_per.length < 5) {
      return (
        <Text style={styles.warningText}>
          La contrasenia debe tener al menos 5 caracteres.
        </Text>
      );
    }
    return null;
  };

  const renderConfContraseniaWarning = () => {
    if (conf_contrasenia.length < 5) {
      return (
        <Text style={styles.warningText}>
          La contrasenia debe tener al menos 5 caracteres.
        </Text>
      );
    }
    return null;
  };

  const renderConfirmarWarning = () => {
    if (!(contrasenia_per === conf_contrasenia)) {
      return (
        <Text style={styles.warningText}>
          Las contrasenias deben coincidir.
        </Text>
      );
    }
    return null;
  };

  const renderNombreWarning = () => {
    if (nombre_per.length < 5) {
      return (
        <Text style={styles.warningText}>
          El nombre debe tener al menos 5 caracteres.
        </Text>
      );
    }
    return null;
  };

  const renderApellidoWarning = () => {
    if (apellido_per.length < 5) {
      return (
        <Text style={styles.warningText}>
          El apellido debe tener al menos 5 caracteres.
        </Text>
      );
    }
    return null;
  };

  const renderTelefonoWarning = () => {
    if (telefono_per.length < 10) {
      return (
        <Text style={styles.warningText}>
          El telefono tiene que tener 10 digitos.
        </Text>
      );
    }
    return null;
  };

  const renderCorreoWarning = () => {
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(correo_per)) {
      return (
        <Text style={styles.warningText}>
          El correo electrónico no es válido.
        </Text>
      );
    }
    return null;
  };

  const renderDireccionWarning = () => {
    if (direccion_per.length < 5) {
      return (
        <Text style={styles.warningText}>
          La direccion debe tener al menos 5 caracteres.
        </Text>
      );
    }
    return null;
  };

  useEffect(() => {
    if (route.params && route.params.cedula_per) {
      navigation.setOptions({ headerTitle: 'Modificando una persona' });
      setEditing(true);
      (async () => {
        const persona = await getPersona(route.params.cedula_per);
        setPersona({
          cedula_per: persona.cedula_per,
          contrasenia_per: persona.contrasenia_per,
          conf_contrasenia: persona.conf_contrasenia,
          nombre_per: persona.nombre_per,
          apellido_per: persona.apellido_per,
          telefono_per: persona.telefono_per,
          correo_per: persona.correo_per,
          direccion_per: persona.direccion_per,
          rol_per: persona.rol_per,
        })

        // Establecer los valores iniciales en los TextInput
        setCedula(persona.cedula_per);
        setContrasenia(persona.contrasenia_per);
        setConf_contrasenia(persona.conf_contrasenia);
        setNombre(persona.nombre_per);
        setApellido(persona.apellido_per);
        setTelefono(persona.telefono_per);
        setCorreo(persona.correo_per);
        setDireccion(persona.direccion_per);
        setRol(persona.rol_per);

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
          placeholder="Cedula Persona"
          placeholderTextColor="#000000"
          value={persona.cedula_per}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, "");
            setCedula(numericValue);
            handleChangePersona('cedula_per', numericValue);
          }}
          maxLength={10}
          keyboardType="numeric" // Permitir solo entrada numérica
          editable={route.params && route.params.cedula_per ? false : true} // Desactivar edición si es una actualización
        />
        {renderCedulaWarning()}
        <TextInput
          style={styles.input}
          placeholder="Contrasenia Persona"
          placeholderTextColor="#000000"
          value={persona.contrasenia_per}
          onChangeText={(text) => {
            setContrasenia(text);
            handleChangePersona('contrasenia_per', text);
          }}
          maxLength={25}
        />
        {renderConfirmarWarning()}
        {renderContraseniaWarning()}
        <TextInput
          style={styles.input}
          placeholder="Confirmacion Contrasenia Persona"
          placeholderTextColor="#000000"
          value={persona.conf_contrasenia}
          onChangeText={(text) => {
            setConf_contrasenia(text);
            handleChangePersona('conf_contrasenia', text);
          }}
          maxLength={25}
        />
        {renderConfirmarWarning()}
        {renderConfContraseniaWarning()}
        <TextInput
          style={styles.input}
          placeholder="Nombre Persona"
          placeholderTextColor="#000000"
          value={persona.nombre_per}
          onChangeText={handleNombreChange}
          maxLength={25}
        />
        {renderNombreWarning()}
        <TextInput
          style={styles.input}
          placeholder="Apellido Persona"
          placeholderTextColor="#000000"
          value={persona.apellido_per}
          onChangeText={handleApellidoChange}
          maxLength={25}
        />
        {renderApellidoWarning()}
        <TextInput
          style={styles.input}
          placeholder="Telefono Persona"
          placeholderTextColor="#000000"
          value={persona.telefono_per}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, "");
            setTelefono(numericValue);
            handleChangePersona('telefono_per', numericValue);
          }}
          maxLength={10}
          keyboardType="numeric" // Permitir solo entrada numérica
        />
        {renderTelefonoWarning()}
        <TextInput
          style={styles.input}
          placeholder="Correo Persona"
          placeholderTextColor="#000000"
          value={persona.correo_per}
          onChangeText={(text) => {
            setCorreo(text);
            handleChangePersona('correo_per', text);
          }}
          maxLength={35}
        />
        {renderCorreoWarning()}
        <TextInput
          style={styles.input}
          placeholder="Direccion Persona"
          placeholderTextColor="#000000"
          value={persona.direccion_per}
          onChangeText={(text) => {
            setDireccion(text);
            handleChangePersona('direccion_per', text);
          }}
          maxLength={50}
        />
        {renderDireccionWarning()}
        <TextInput
          style={styles.input}
          placeholder="Rol Persona"
          placeholderTextColor="#000000"
          value={persona.rol_per}
          onChangeText={(text) => {
            setRol(text);
            handleChangePersona('rol_per', text);
          }}
          onFocus={() => setModalVisible(true)}
          editable={false}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Seleccionar Rol</Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ backgroundColor: "white", padding: 20, backgroundColor: "#AF8A46" }}>
              <TouchableOpacity onPress={() => handleOptionSelect("Estudiante")}>
                <Text style={{ textAlign: "center", marginTop: 10, backgroundColor: "#EBBA5F" }}>Estudiante</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOptionSelect("Docente")}>
                <Text style={{ textAlign: "center", marginTop: 30, marginBottom: 10, backgroundColor: "#EBBA5F" }}>Docente</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOptionSelect("Tecnico")}>
                <Text style={{ textAlign: "center", marginTop: 30, marginBottom: 30, backgroundColor: "#EBBA5F" }}>Tecnico</Text>
              </TouchableOpacity>
              <Button title="Cerrar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>

        {
          !editing ? (<TouchableOpacity disabled={!isButtonEnabled} onPress={handleSubmit}>
            <Text style={[styles.buttonText, isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled]}>
              Guardar Persona
            </Text>
          </TouchableOpacity>) : (<TouchableOpacity disabled={!isButtonEnabled} onPress={handleSubmit}>
            <Text style={[styles.buttonText, isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled]}>
              Actualizar Persona
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

export default PersonaFormScreen;
