import { useState, useEffect } from 'react';
import axios from 'axios';
import './Funcionarios.css';

function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);

    const [inputNome, setInputNome] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputTelefone, setInputTelefone] = useState('');
    const [inputProfissao, setInputProfissao] = useState('');

    const fetchFuncionarios = async () => {
        try {
            const response = await axios.get('http://localhost:3000/funcionarios');
            setFuncionarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        }
    };

    useEffect(() => {
        fetchFuncionarios();
    }, []);

    const salvarFuncionario = async () => {
        try {
            const funcionario = {
                nome: inputNome,
                email: inputEmail,
                telefone: inputTelefone,
                profissao: inputProfissao,
            };
            const response = await axios.put(`http://localhost:3000/funcionarios/${funcionarioSelecionado.id}`, funcionario);
            if (response.status === 200) {
                fetchFuncionarios();
                limparForm();
                alert('Alterações feitas com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
        }
    };

    const deletarFuncionario = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/funcionarios/${id}`);
            if (response.status === 200) {
                fetchFuncionarios();
                alert('Funcionário deletado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao deletar funcionário:', error);
        }
    };

    function limparForm() {
        setInputNome('');
        setInputEmail('');
        setInputTelefone('');
        setInputProfissao('');
        setFuncionarioSelecionado(null);
    }

    function exibirFuncionario(funcionario) {
        setFuncionarioSelecionado(funcionario);
        setInputNome(funcionario.nome || '');
        setInputEmail(funcionario.email || '');
        setInputTelefone(funcionario.telefone || '');
        setInputProfissao(funcionario.profissao || '');
    }

    return (
        <div className='container-funcionarios'>
            <h1 className='titulo-funcionarios'>Tabela Funcionários</h1>

            <div className='form-funcionarios'>
                {funcionarioSelecionado && (
                    <>
                        <h2>Editando: {funcionarioSelecionado.nome}</h2>
                        <div className="input-container-funcionarios">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={inputNome}
                                onChange={(e) => setInputNome(e.target.value)}
                            />
                        </div>
                        <div className="input-container-funcionarios">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={inputEmail}
                                onChange={(e) => setInputEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-container-funcionarios">
                            <label htmlFor="telefone">Telefone</label>
                            <input
                                type="text"
                                placeholder="Telefone"
                                value={inputTelefone}
                                onChange={(e) => setInputTelefone(e.target.value)}
                            />
                        </div>
                        <div className="input-container-funcionarios">
                            <label htmlFor="profissao">Profissão</label>
                            <input
                                type="text"
                                placeholder="Profissão"
                                value={inputProfissao}
                                onChange={(e) => setInputProfissao(e.target.value)}
                            />
                        </div>
                        <button onClick={salvarFuncionario}>Salvar Alterações</button>
                        <button onClick={limparForm}>Cancelar</button>
                    </>
                )}
            </div>

            <section className='funcionarios-container'>
                {funcionarios.map((funcionario) => (
                    <div key={funcionario.id} className='funcionario'>
                        <h2>{funcionario.nome}</h2>
                        <p>Email: {funcionario.email}</p>
                        <p>Telefone: {funcionario.telefone}</p>
                        <p>Profissão: {funcionario.profissao}</p>
                        <button onClick={() => exibirFuncionario(funcionario)}>Editar</button>
                        <button onClick={() => deletarFuncionario(funcionario.id)}>Deletar</button>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Funcionarios;