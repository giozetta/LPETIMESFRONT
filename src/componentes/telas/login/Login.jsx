import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Alerta from '../../Alerta';
import './singin.css';
import jwt_decode from "jwt-decode";
import Autenticacao from '../../seg/Autenticacao';

function Login() {

    const {pegaAutenticacao, gravaAutenticacao} = Autenticacao;
        
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);

    const acaoLogin = async e => {

        e.preventDefault();

        try {
            const body = {
                email: email,
                senha: senha
            };
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }).then(response => response.json())
                .then(json => {                    
                    setAlerta({ status: "success", message: JSON.stringify(json) })
                    if (json.auth === true) {                        
                        setAutenticado(true);
                        gravaAutenticacao(json);
                    }
                });
        } catch (err) {
            console.error(err.message);
        }

        const autenticacao = pegaAutenticacao();
        console.log(autenticacao);
       


    };

     useEffect(() => {
        const autenticacao = pegaAutenticacao();        
        if (autenticacao != null){
            console.log("autenticação não é null");
       if (autenticacao.auth === true) {
                setAutenticado(true);
             }            
        }    
    }, []); 

    if (autenticado === true) {
        return <Navigate  to="/privado" />
    }

    return (
        <div>
            <body className="text-center">
                <Alerta alerta={alerta} />
                <main className="form-signin">
                    <form onSubmit={acaoLogin}>
                        <h1 className="h3 mb-3 fw-normal">Login de usuário</h1>

                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Nome de usuário"
                                value={email}
                                name="email"
                                onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Senha"
                                value={senha}
                                name="senha"
                                onChange={e => setSenha(e.target.value)} />
                            <label htmlFor="floatingPassword">Senha</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Efetuar login</button>
                    </form>
                </main>
            </body>
        </div>
    )

}

export default Login;
