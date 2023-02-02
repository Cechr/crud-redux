import {
    AGREGAR_EMPLEADO,
    AGREGAR_EMPLEADO_EXITO,
    AGREGAR_EMPLEADO_ERROR,
    COMENZAR_DESCARGA_EMPLEADOS,
    DESCARGA_EMPLEADOS_EXITO,
    DESCARGA_EMPLEADOS_ERROR,
    OBTENER_EMPLEADO_ELIMINAR,
    EMPLEADO_ELIMINADO_EXITO,
    EMPLEADO_ELIMINADO_ERROR,
    OBTENER_EMPLEADO_EDITAR,
    COMENZAR_EDICION_EMPLEADO,
    EMPLEADO_EDITADO_EXITO,
    EMPLEADO_EDITADO_ERROR
} from "../types"

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

// Crear nuevos empleados
export function crearNuevoEmpleadoAction(empleado) {
    return async (dispatch) => {
        dispatch( agregarEmpleado() );

        try {
            // insertar en la API
            const respuesta = await clienteAxios.post('/empleados', empleado);
            console.log(respuesta)

            // Si todo sale bien, actualizar el state
            dispatch( agregarEmpleadoExito(empleado) );

            // Alerta
            Swal.fire(
                'Correcto',
                'El empleado se agregó correctamente',
                'success'
            );

        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch( agregarEmpleadoError(true) );

            // alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarEmpleado = () => ({
    type: AGREGAR_EMPLEADO,
    payload: true
});

// si el empleado se guarda en la base de datos
const agregarEmpleadoExito = empleado => ({
    type: AGREGAR_EMPLEADO_EXITO,
    payload: empleado
})

// si hubo un error
const agregarEmpleadoError = estado => ({
    type: AGREGAR_EMPLEADO_ERROR,
    payload: estado
});

// Función que descarga los empleados de la base de datos
export function obtenerEmpleadosAction() {
    return async (dispatch) => {
        dispatch( descargarEmpleados() );

        try {
            const respuesta = await clienteAxios.get('/empleados');
            dispatch( descargaEmpleadosExitosa(respuesta.data) )
        } catch (error) {
            console.log(error);
            dispatch( descargaEmpleadosError() )
        }
    }
}

const descargarEmpleados = () => ({
    type: COMENZAR_DESCARGA_EMPLEADOS,
    payload: true
});

const descargaEmpleadosExitosa = empleados => ({
    type: DESCARGA_EMPLEADOS_EXITO,
    payload: empleados
})

const descargaEmpleadosError = () => ({
    type: DESCARGA_EMPLEADOS_ERROR,
    payload: true
});

// Selecciona y elimina el empleado
export function borrarEmpleadoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerEmpleadoEliminar(id) );

        try {
            await clienteAxios.delete(`/empleados/${id}`);
            dispatch( eliminarEmpleadoExito() );

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado',
                'El empleado se eliminó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch( eliminarEmpleadoError() );
        }
    }
}

const obtenerEmpleadoEliminar = id => ({
    type: OBTENER_EMPLEADO_ELIMINAR,
    payload: id
});

const eliminarEmpleadoExito = () => ({
    type: EMPLEADO_ELIMINADO_EXITO
})
const eliminarEmpleadoError = () => ({
    type: EMPLEADO_ELIMINADO_ERROR,
    payload: true
});

// Colocar empleado en edición
export function obtenerEmpleadoEditar(empleado) {
    return (dispatch) => {
        dispatch( obtenerEmpleadoEditarAction(empleado) )
    }
}

const obtenerEmpleadoEditarAction = empleado => ({
    type: OBTENER_EMPLEADO_EDITAR,
    payload: empleado
})

// Edita un registro en la api y state
export function editarEmpleadoAction(empleado) {
    return async (dispatch) => {
        dispatch( editarEmpleado() );

        try {
            await clienteAxios.put(`/empleados/${empleado.id}`, empleado);
            dispatch( editarEmpleadoExito(empleado) );
        } catch (error) {
            console.log(error);
            dispatch( editarEmpleadoError() );
        }
    }
}

const editarEmpleado = () => ({
    type: COMENZAR_EDICION_EMPLEADO
});

const editarEmpleadoExito = empleado => ({
    type: EMPLEADO_EDITADO_EXITO,
    payload: empleado
});

const editarEmpleadoError = () => ({
    type: EMPLEADO_EDITADO_ERROR,
    payload: true
})
