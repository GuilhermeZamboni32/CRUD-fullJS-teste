import { useState, useEffect } from 'react';
import axios from 'axios';
import './App3.css';

function App() {
    const [dietas, setDietas] = useState([]);
    const [dietaSelecionada, setDietaSelecionada] = useState(null);

    const [inputHorarioDieta, setInputHorarioDieta] = useState('');
    const [inputIngredientesDieta, setInputIngredientesDieta] = useState('');

    const fetchDietas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/dietas');
            setDietas(response.data);
        } catch (error) {
            console.error('Erro ao buscar dietas:', error);
        }
    };

    useEffect(() => {
        fetchDietas();
    }, []);

    const cadastrarDieta = async () => {
        try {
            const dieta = {
                horario_dieta: inputHorarioDieta,
                ingredientes_dieta: inputIngredientesDieta,
            };
            const response = await axios.post('http://localhost:3000/dietas', dieta);
            if (response.status === 201) {
                fetchDietas();
                limparForm();
                alert('Dieta cadastrada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao adicionar dieta:', error);
        }
    };

    const salvarDieta = async () => {
        try {
            const dieta = {
                horario_dieta: inputHorarioDieta,
                ingredientes_dieta: inputIngredientesDieta,
            };
            const response = await axios.put(`http://localhost:3000/dietas/${dietaSelecionada.id_dieta}`, dieta);
            if (response.status === 200) {
                fetchDietas();
                setDietaSelecionada(null);
                limparForm();
                alert('Alterações feitas com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar dieta:', error);
        }
    };

    const buscarDietaPorId = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/dietas/${id}`);
            setDietaSelecionada(response.data);
            exibirDieta(response.data);
        } catch (error) {
            console.error('Erro ao buscar dieta por ID:', error);
        }
    };

    const deletarDieta = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/dietas/${id}`);
            if (response.status === 200) {
                fetchDietas();
                alert('Dieta deletada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao deletar dieta:', error);
        }
    };

    function limparForm() {
        setInputHorarioDieta('');
        setInputIngredientesDieta('');
    }

    function exibirDieta(dieta) {
        setInputHorarioDieta(dieta.horario_dieta || '');
        setInputIngredientesDieta(dieta.ingredientes_dieta || '');
    }

    return (
        <div className='app-container'>
            <h1>CRUD de Dietas</h1>

            <div className='form'>
                <div className="input-container">
                    <label htmlFor="horario_dieta">Horário da Dieta</label>
                    <input
                        type="text"
                        placeholder="08:00"
                        value={inputHorarioDieta}
                        onChange={(event) => setInputHorarioDieta(event.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="ingredientes_dieta">Ingredientes</label>
                    <textarea
                        placeholder="Ovos, pão integral, suco de laranja"
                        value={inputIngredientesDieta}
                        onChange={(event) => setInputIngredientesDieta(event.target.value)}
                    />
                </div>
                {dietaSelecionada && <button type="button" onClick={salvarDieta}>Salvar Alterações</button>}
                {!dietaSelecionada && <button type="button" onClick={cadastrarDieta}>Cadastrar Dieta</button>}
            </div>

            <section className='dietas'>
                {dietas.map((dieta) => (
                    <div key={dieta.id_dieta} className='dieta'>
                        <h2>Horário: {dieta.horario_dieta}</h2>
                        <p>Ingredientes: {dieta.ingredientes_dieta}</p>
                        <p>ID: {dieta.id_dieta}</p>
                        <button onClick={() => buscarDietaPorId(dieta.id_dieta)}>Editar</button>
                        <button onClick={() => deletarDieta(dieta.id_dieta)}>Deletar</button>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default App;