import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import Home from './componentes/Home'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Time from './componentes/telas/time/Time'
import Jogador from './componentes/telas/jogador/Jogador'
import Login from './componentes/telas/login/Login'
import MenuPublico from './MenuPublico'
import MenuPrivado from './MenuPrivado'

function App() {
  return (
      <Router>
      <Routes>
        <Route  path="/" element={<MenuPublico />}  >
          <Route index   element={<Home />} />
          <Route exact="true" path="/login" element={<Login />} />
        </Route>

        <Route  path="/privado" element={<MenuPrivado />}  >
          <Route index   element={<Home />} />
          <Route exact="true" path="times" element={<Time />} />
          <Route exact="true" path="jogadores" element={<Jogador />} />
          <Route exact="true" path="login" element={<Login />} />
        </Route>        
      </Routes>
    </Router>
  );
}

export default App;
