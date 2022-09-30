import { useState, useEffect } from 'react';
import JogadorContext from './JogadorContext';
import Tabela from './Tabela';
import Form from './Form';
import Carregando from '../../Carregando';

function Jogador() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        idade: 0, altura: 0, time: ""
    });
    const [listaTimes, setListaTimes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogadores/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogadores`, 
            {
                method : metodo,
                headers : {"Content-Type": "application/json"},
                body : JSON.stringify(objeto)
            }).then(response => response.json())
              .then(json => {
                    setAlerta({status : json.status, message : json.message});
                    setObjeto(json.objeto);
                    if (!editar){
                        setEditar(true);
                    }
              })
        } catch(err){
            console.log(err.message);
        }
        recuperaJogadores();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value})
    }

    const recuperaTimes = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/times`)
            .then(response => response.json())
            .then(data => setListaTimes(data))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const recuperaJogadores = async () => {
        setCarregando(true);
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogadores`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({ status: "error", message: err }));
        setCarregando(false);            
    }    

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                // chamada ao método de remover da api
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/jogadores/${objeto.codigo}`,
                        { method: "DELETE" })
                        .then(response => response.json())
                        .then(json =>
                            setAlerta({ status: json.status, message: json.message }))
                // consulto a api novamente para trazer os registros do banco atualizados
                recuperaJogadores();

            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaTimes();
        recuperaJogadores();
    }, []);

    return (
        <JogadorContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaTimes, remover, 
                objeto, setObjeto, 
                editar, setEditar, 
                recuperar, 
                acaoCadastrar, 
                handleChange, listaTimes
            }
        }>
            { !carregando ? <Tabela /> : <Carregando/> }
            <Form/>
        </JogadorContext.Provider>
    )
}

export default Jogador;