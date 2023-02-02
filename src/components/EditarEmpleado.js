import { useDispatch, useSelector } from 'react-redux';
import { editarEmpleadoAction } from '../actions/empleadoActions';
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";

export default function EditarEmpleado() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // nuevo state de empleado
    const [ empleado, guardarEmpleado] = useState({
        nombreCompleto: '',
        numTelefono: ''
    })

    // empleado a editar
    const empleadoeditar = useSelector(state => state.empleados.empleadoeditar);

    // llenar el state automaticamente
    useEffect( () => {
        guardarEmpleado(empleadoeditar);
    }, [empleadoeditar]);

    // Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarEmpleado({
            ...empleado,
            [e.target.name] : e.target.value
        })
    }


    const { nombreCompleto, numTelefono} = empleado;

    const submitEditarEmpleado = e => {
        e.preventDefault();

        dispatch( editarEmpleadoAction(empleado) );

        navigate('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Empleado
                        </h2>

                        <form
                            onSubmit={submitEditarEmpleado}
                        >
                            <div className="form-group">
                                <label>Nombre Empleado</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Empleado"
                                    name="nombreCompleto"
                                    value={nombreCompleto}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Empleado</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Empleado"
                                    name="numTelefono"
                                    value={numTelefono}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}