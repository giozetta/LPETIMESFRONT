import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Time from './componentes/telas/time/Time'
import Jogador from './componentes/telas/jogador/Jogador'

function App() {
  return (
      <Router>
        <Menu/>
        <Routes>
          <Route exact="true" path="/" element={<Home/>}/>
          <Route exact="true" path="/times" element={<Time/>}/>
          <Route exact="true" path="/jogadores" element={<Jogador/>}/>
        </Routes>
      </Router>
  );
}

export default App;
