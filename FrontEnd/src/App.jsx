import { Router, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/home/Home';
// import Cadastro from './pages/cadastro/Cadastro';
// import Login from './pages/login/Login';

function App() {
    
    return (
    <div className='app-container'>
        <div>
            <Home />
        </div>
            
    </div>
    );
}

export default App;
