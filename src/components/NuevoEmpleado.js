import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

// Actions de Redux
import { crearNuevoEmpleadoAction } from '../actions/empleadoActions';
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

export default function NuevoEmpleado() {
    const navigate = useNavigate()
    // state del componente
    const [nombreCompleto, guardarNombreCompleto] = useState('');
    const [numTelefono, guardarNumTelefono] = useState('');

    // utilizar use dispatch y te crea una función
    const dispatch = useDispatch();

    // Acceder al state del store
    const cargando = useSelector( state => state.empleados.loading );
    const error = useSelector(state => state.empleados.error);
    const alerta = useSelector(state => state.alerta.alerta);

    // mandar llamar el action de empleadoAction
    const agregarEmpleado = empleado => dispatch( crearNuevoEmpleadoAction(empleado) );

    // cuando el usuario haga submit
    const submitNuevoEmpleado = e => {
        e.preventDefault();

        // validar formulario
        if(nombreCompleto.trim() === '' || numTelefono <= 0) {

            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch( mostrarAlerta(alerta) );

            return;
        }

        // si no hay errores
        dispatch( ocultarAlertaAction() );

        // crear el nuevo empleado
        agregarEmpleado({
            nombreCompleto,
            numTelefono
        });

        // redireccionar
        navigate('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Empleado
                        </h2>

                        {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null }

                        <form
                            onSubmit={submitNuevoEmpleado}
                        >
                            <div className="form-group">
                                <label>Nombre Completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Completo"
                                    name="nombre-completo"
                                    value={nombreCompleto}
                                    onChange={e => guardarNombreCompleto(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>N# de Teléfono</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="N# de Teléfono"
                                    name="num-telefono"
                                    value={numTelefono}
                                    onChange={e =>  guardarNumTelefono( Number(e.target.value) )}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>

                        {/*Aqui se pone un spinner, actualmente esto se ejecuta muy rápido*/}
                        { cargando ? <p>Cargando...</p> : null }

                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}