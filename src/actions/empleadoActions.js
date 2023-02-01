import  {
    AGREGAR_EMPLEADO,
    AGREGAR_EMPLEADO_EXITO,
    AGREGAR_EMPLEADO_ERROR,
    COMENZAR_DESCARGA_EMPLEADOS,
    DESCARGA_EMPLEADOS_EXITO,
    DESCARGA_EMPLEADOS_ERROR
} from "../types"

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

// Crear nuevos empleados
export function crearNuevoEmpleadoAction(empleado) {
    return async (dispatch) => {
        dispatch( agregarEmpleado() );

        try {
            // insertar en la API
            const respuesta = await clienteAxios.post('/empleado', empleado);
            console.log(respuesta)

            // Si todo sale bien, actualizar el state
            dispatch( agregarEmpleadoExito(empleado) );

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
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

// Función que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {
            const respuesta = await clienteAxios.get('/productos');
            // dispatch( descargaProductosExitosa(respuesta.data) )
        } catch (error) {
            console.log(error);
            // dispatch( descargaProductosError() )
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_EMPLEADOS,
    payload: true
});

/*const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})*/
/*const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});*/
