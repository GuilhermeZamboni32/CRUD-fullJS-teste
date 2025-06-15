import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {

  const navigate = useNavigate()

  function cadastro(){
    navigate('/cadastro');
  }
  function login(){
    navigate('/login');
  }

  return (
    <div className="container-home">
      <header className="container-header">
        <h1>Bem-vindo à nossa plataforma</h1>
        <p>Simplifique sua jornada com nossos serviços inteligentes e eficientes.</p>
        <div className="container-buttons">
          <button to="/cadastro" className="button-cadastro" onClick={cadastro}>Cadastre-se</button>
          <Link to="/login" className="button-login" onClick={login}>Entrar</Link>
        </div>
      </header>

      <section className="container-sobre">
        <div className="card-sobre">
          <h3>Praticidade</h3>
          <p>Encontre tudo o que precisa em poucos cliques.</p>
        </div>
        <div className="card-sobre">
          <h3>Segurança</h3>
          <p>Protegemos seus dados com tecnologia de ponta.</p>
        </div>
        <div className="card-sobre">
          <h3>Conectividade</h3>
          <p>Acesse de qualquer lugar, a qualquer hora.</p>
        </div>
      </section>

      <footer className="container-footer">
        <p>&copy; {new Date().getFullYear()} MeuSite. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;
