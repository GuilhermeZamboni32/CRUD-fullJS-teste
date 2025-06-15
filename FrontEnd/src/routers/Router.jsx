import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Cadastro from "../pages/cadastro/Cadastro";
import Login from "../pages/login/Login";
import Perfil from "../pages/perfil/Perfil";


const router = createBrowserRouter([
    {path: "/", element: <Home />},
    {path: "/cadastro", element: <Cadastro />},
    {path: "/login", element: <Login />},
    {path: "/perfil", element: <Perfil />},
])