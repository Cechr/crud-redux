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

// cada reducer tiene su propio state
const initialState = {
    empleados: [],
    error: null,
    loading: false,
    empleadoeliminar: null,
    empleadoeditar: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case COMENZAR_DESCARGA_EMPLEADOS:
        case AGREGAR_EMPLEADO:
            return {
                ...state,
                loading: action.payload
            }
        case AGREGAR_EMPLEADO_EXITO:
            return {
                ...state,
                loading: false,
                empleados: [...state.empleados, action.payload]
            }
        case AGREGAR_EMPLEADO_ERROR:
        case DESCARGA_EMPLEADOS_ERROR:
        case EMPLEADO_ELIMINADO_ERROR:
        case EMPLEADO_EDITADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_EMPLEADOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                empleados: action.payload
            }
        case OBTENER_EMPLEADO_ELIMINAR:
            return {
                ...state,
                empleadoeliminar: action.payload
            }
        case EMPLEADO_ELIMINADO_EXITO:
            return {
                ...state,
                empleados: state.empleados.filter( empleado => empleado.id !== state.empleadoeliminar ),
                empleadoeliminar: null
            }
        case OBTENER_EMPLEADO_EDITAR:
            return {
                ...state,
                empleadoeditar: action.payload
            }
        case EMPLEADO_EDITADO_EXITO:
            return {
                ...state,
                empleadoeditar: null,
                empleados: state.empleados.map( empleado => empleado.id === action.payload.id ? empleado = action.payload : empleado )
            }
        default:
            return state;
    }
}