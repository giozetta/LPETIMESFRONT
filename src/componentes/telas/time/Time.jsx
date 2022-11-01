import React, { useState, useEffect } from 'react';
import TimeContext from './TimeContext';
import Tabela from './Tabela';
import Form from './Form';
import Carregando from '../../Carregando';
import WithAuth from '../../seg/WithAuth';
import Autenticacao from '../../seg/Autenticacao';
import { useNavigate } from "react-router-dom";

function Time() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        cidade: ""
    });
    const [carregando, setCarregando] = useState(true);

    const recuperar = async codigo => {
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/times/${codigo}`, {
                method: "GET", headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            })
                .then(response => response.json())
                .then(data => setObjeto(data))
                .catch(err => setAlerta({ status: "error", message: err }))
        } catch (err) {
            setAlerta({ "status": "error", "message": err });
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/times`,
                {
                    method: metodo,
                    headers: { "Content-Type": "application/json", "x-access-token": Autenticacao.pegaAutenticacao().token },
                    body: JSON.stringify(objeto)
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status);
                })
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                })
        } catch (err) {
            console.log(err.message);
        }
        recuperaTimes();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value })
    }

    const recuperaTimes = async () => {
        try {
            setCarregando(true);
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/times`, {
                method: "GET", headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status);
                })
                .then(data => setListaObjetos(data))
                .catch(err => setAlerta({ status: "error", message: err }));
            setCarregando(false);
        } catch (err) {
            setAlerta({ "status": "error", "message": err });
            window.location.reload();
            navigate("/login", { replace: true });
        }

    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                // chamada ao método de remover da api
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/times/${objeto.codigo}`, {
                        method: "DELETE", headers: {
                            "Content-Type": "application/json",
                            "x-access-token": Autenticacao.pegaAutenticacao().token
                        }
                    })
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            }
                            throw new Error('Erro código: ' + response.status);
                        })
                        .then(json =>
                            setAlerta({ status: json.status, message: json.message }))
                // consulto a api novamente para trazer os registros do banco atualizados
                recuperaTimes();

            } catch (err) {
                setAlerta({ "status": "error", "message": err });
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaTimes()
    }, []);

    return (

        <TimeContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaTimes, remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar,
                handleChange
            }
        }>
            {!carregando ? <Tabela /> : <Carregando />}
            <Form />

        </TimeContext.Provider>

    )
}

export default WithAuth(Time);