import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className='container-navbar'>
        <Link className="texto" to="/">Home</Link>
        <Link className="texto" to="/cadastro">Cadastro</Link>
        <Link className="texto" to="/login"> Login</Link>
    </div>
  );
}

export default Navbar;
