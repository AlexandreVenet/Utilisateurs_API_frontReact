import './App.css';

import Accueil from './components/accueil/Accueil';
import Faq from './components/faq/Faq';
import Connexion from './components/connexion/Connexion';
import Inscription from './components/inscription/Inscription';

import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import { useState } from 'react';


function App() {

  const [connexion, connexionSetter] = useState(false);

  console.log("utilisateur connecté : "+ connexion);

  function Deconnect(e)
  {
    e.preventDefault();
    connexionSetter(false);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/faq">FAQ</Link>
            {
              connexion ?
                <>
                  <a href="#" onClick={Deconnect}>Déconnecter</a>
                </>
              :
                <>
                  <Link to="/connexion">Connexion</Link>
                  <Link to="/inscription">Inscription</Link>
                </>
            }
        </nav>
        <Routes>
          <Route path="/" element={<Accueil/>}/>
          <Route path="/faq" element={<Faq/>}/>
          {/* <Route path="/connexion" element={<Connexion connexion={connexion} connexionSetter={connexionSetter}/>}/> */}
          {
            connexion ? 
              <>
                <Route path="/connexion" element={ <Navigate to="/" /> } />
                <Route path="/inscription" element={ <Navigate to="/" /> } />
              </>
            :
              <>
                <Route path="/connexion" element={<Connexion connexion={connexion} connexionSetter={connexionSetter}/>}/>
                <Route path="/inscription" element={<Inscription/>}/>
              </>
          }
          <Route path="/*" element={<Accueil/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
