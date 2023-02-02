import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {obtenerEmpleadosAction} from "../actions/empleadoActions";
import Empleado from "./Empleado";

export default function Empleados() {

    const dispatch = useDispatch();

    useEffect( ()=> {
        // Consultar la api
        const cargarEmpleados = () => dispatch( obtenerEmpleadosAction() );
        cargarEmpleados();
    }, []);

    // obtener el state
    const empleados = useSelector( state => state.empleados.empleados );
    const error = useSelector(state => state.empleados.error);
    const cargando = useSelector(state => state.empleados.loading);

    return (
        <>
            <h2 className="text-center my-5">Listado de Empleados</h2>

            { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }

            { cargando ? <p className="text-center">Cargando....</p> : null }

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">N# de Teléfono</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {empleados.length === 0 ? (
                    <tr>
                        <td>No hay productos</td>
                    </tr>
                ) : (
                    empleados.map(empleado => (
                        <Empleado key={empleado.id} empleado={empleado} />
                    ))
                )}
                </tbody>
            </table>
        </>
    )
}