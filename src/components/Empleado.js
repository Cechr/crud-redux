import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import {borrarEmpleadoAction, obtenerEmpleadoEditar} from '../actions/empleadoActions';

const Empleado = ({empleado}) => {
    const { nombreCompleto, numTelefono, id } = empleado;

    const dispatch = useDispatch();
    const navigate = useNavigate(); // habilitar history para redirección*/

    // Confirmar si desea eliminarlo
    const confirmarEliminarEmpleado = id => {

        // preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un empleado que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // pasarlo al action
                dispatch( borrarEmpleadoAction(id) );
            }
        });
    }

    // función que redirige de forma programada
    const redireccionarEdicion = empleado => {
        dispatch( obtenerEmpleadoEditar(empleado) );
        navigate(`/empleado/editar/${empleado.id}`)
    }

    return (
        <tr>
            <td>{nombreCompleto}</td>
            <td><span className="font-weight-bold"> {numTelefono} </span></td>
            <td className="acciones">
                <button
                    type="button"
                    onClick={ () => redireccionarEdicion(empleado) }
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarEmpleado(id)}
                >Eliminar </button>
            </td>
        </tr>
    );
}

export default Empleado;