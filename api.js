import { Alert } from "react-native";

const APIper = "http://192.168.100.207:3000/persona";
const APIequ = "http://192.168.100.207:3000/equipos";
const APIsol = "http://192.168.100.207:3000/solicitudes";
const APIcus = "http://192.168.100.207:3000/custodia";
const APIdev = "http://192.168.100.207:3000/devoluciones";
const APIlog = "http://192.168.100.207:3000";

export const getPersonaAll = async () => {
    const res = await fetch(APIper)
    return await res.json()
};

export const getPersonaSi = async () => {
    const res = await fetch(`${APIper}/si`)
    return await res.json()
};

export const getPersona = async (cedula_per) => {
    const res = await fetch(`${APIper}/${cedula_per}`)
    return await res.json();
}

export const postPersona = async (nuevaPersona) => {
    const res = await fetch(APIper, {
        method: 'POST',
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(nuevaPersona)
    });
    return await res.json();
};

export const updatePersona = async (cedula_per, nuevaPersona) => {
    const res = await fetch(`${APIper}/${cedula_per}`, {
        method: 'PUT',
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(nuevaPersona),
    })
    return res;
};

export const deletePersona = async cedula_per => {
    await fetch(`${APIper}/delete/${cedula_per}`, {
        method: 'PUT',
    })
};

export const activatePersona = async cedula_per => {
    await fetch(`${APIper}/activate/${cedula_per}`, {
        method: 'PUT',
    })
};



export const getEquiposAll = async () => {
    const res = await fetch(APIequ)
    return await res.json()
};

export const getEquiposSi = async () => {
    const res = await fetch(`${APIequ}/si`)
    return await res.json()
};

export const getEquipos = async (id_equ) => {
    const res = await fetch(`${APIequ}/${id_equ}`)
    return await res.json();
}

export const postEquipos = async (nuevoEquipo) => {
    const res = await fetch(APIequ, {
        method: 'POST',
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEquipo)
    });
    return await res.json();
};

export const updateEquipos = async (id_equ, nuevoEquipo) => {
    const res = await fetch(`${APIequ}/${id_equ}`, {
        method: 'PUT',
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEquipo),
    })
    return res;
};

export const deleteEquipos = async id_equ => {
    await fetch(`${APIequ}/delete/${id_equ}`, {
        method: 'PUT',
    })
};

export const activateEquipos = async id_equ => {
    await fetch(`${APIequ}/activate/${id_equ}`, {
        method: 'PUT',
    })
};



export const getSolicitudesAll = async () => {
    const res = await fetch(APIsol)
    return await res.json()
};

export const getSolicitudesSi = async () => {
    const res = await fetch(`${APIsol}/si`)
    return await res.json()
};

export const getSolicitudes = async (id_sol) => {
    const res = await fetch(`${APIsol}/${id_sol}`)
    return await res.json();
}

export const postSolicitudes = async (nuevaSolicitud) => {
    const res = await fetch(APIsol, {
        method: 'POST',
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(nuevaSolicitud)
    });
    return await res.json();
};

export const updateSolicitudes = async (id_sol, nuevaSolicitud) => {
    try {
        const res = await fetch(`${APIsol}/${id_sol}`, {
            method: 'PUT',
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(nuevaSolicitud),
        });
        if (!res.ok) {
            if (res.status === 45000) {
                throw new Error("No es posible actualizar la solicitud porque el equipo está ocupado.");
            } else if (res.status === 404) {
                throw new Error("La cédula no se encuentra en la base de datos.");
            } else {
                throw new Error("Ocurrió un error al procesar la solicitud.");
            }
        }
        return res;
    } catch (error) {
        Alert.alert("Error", error.message);
        throw error;
    }
};

export const deleteSolicitudes = async id_sol => {
    await fetch(`${APIsol}/delete/${id_sol}`, {
        method: 'PUT',
    })
};

export const activateSolicitudes = async id_sol => {
    await fetch(`${APIsol}/activate/${id_sol}`, {
        method: 'PUT',
    })
};



export const getCustodiaAll = async () => {
    const res = await fetch(APIcus)
    return await res.json()
};

export const getCustodiaSi = async () => {
    const res = await fetch(`${APIcus}/si`)
    return await res.json()
};

export const getCustodia = async (id_cus) => {
    const res = await fetch(`${APIcus}/${id_cus}`)
    return await res.json();
}

export const deleteCustodia = async id_cus => {
    await fetch(`${APIcus}/delete/${id_cus}`, {
        method: 'PUT',
    })
};



export const getDevolucionesAll = async () => {
    const res = await fetch(APIdev)
    return await res.json()
};

export const getDevolucionesSi = async () => {
    const res = await fetch(`${APIdev}/si`)
    return await res.json()
};

export const getDevoluciones = async (id_dev) => {
    const res = await fetch(`${APIdev}/${id_dev}`)
    return await res.json();
}

export const updateDevoluciones = async (id_dev, nuevaDevolucion) => {
    const res = await fetch(`${APIdev}/${id_dev}`, {
        method: 'PUT',
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(nuevaDevolucion),
    })
    return res;
};

export const deleteDevoluciones = async id_dev => {
    await fetch(`${APIdev}/delete/${id_dev}`, {
        method: 'PUT',
    })
};

export const activateDevoluciones = async id_dev => {
    await fetch(`${APIdev}/activate/${id_dev}`, {
        method: 'PUT',
    })
};

export const login = async (cedula, contrasenia) => {
    const response = await fetch(`${APIlog}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cedula: cedula,
            contrasenia: contrasenia,
        }),
    });

    const data = await response.json();
    return data;
};
