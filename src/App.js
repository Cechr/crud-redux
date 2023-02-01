import Header from "./components/Header";
import Empleados from "./components/Empleados";
import NuevoEmpleado from "./components/NuevoEmpleado";
import EditarEmpleado from "./components/EditarEmpleado";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {Provider} from "react-redux";
import store from "./store";
function App() {
  return (
      <Router>
          <Provider store={store}>
              <Header/>
              <div className="container mt-5">
                  <Routes>
                      <Route exact path="/" element={<Empleados/>} />
                      <Route exact path="/empleado/nuevo" element={<NuevoEmpleado/>} />
                      <Route exact path="/empleado/editar/:id" element={<EditarEmpleado/>} />
                  </Routes>
              </div>
          </Provider>
      </Router>
  );
}

export default App;
