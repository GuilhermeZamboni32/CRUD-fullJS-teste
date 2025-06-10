import { useState, useEffect } from 'react';
import './App.css';
import Cadastro from './components/Cadastro';
import Exercicio from './components/Exercicio';
import Dieta from './components/Dieta';
import Funcionarios from './components/Funcionarios';

function App() {
    
    return (
        <div className='app-container'>
            <div>
                <Cadastro /> 
            </div>

            <div>
                <Exercicio />  
            </div>

            <div>
                <Dieta />
            </div>

            <div>
                <Funcionarios />
            </div>
        </div>
    );
}

export default App;
