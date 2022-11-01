import jwt_decode from "jwt-decode";

const NOMEAPP = 'LPE';

const pegaAutenticacao = () => {

    const localStorageAutenticacao = localStorage.getItem(NOMEAPP + '/autenticacao');
    const autenticacao = localStorageAutenticacao ?
        JSON.parse(localStorageAutenticacao) : null;
    console.log("autenticação: " + JSON.stringify(autenticacao));
    if (autenticacao === null) {
        return null;
    }
    if (autenticacao.auth === false) {
        return null;
    } else {
        var decoded = jwt_decode(autenticacao.token);
        // verificando se o token não expirou
        if (decoded.exp <= Math.floor(new Date() / 1000)) {
            console.log('Token expirado');
            logout();
            return null;
        } else {
            console.log('Token não expirado');
            //setAutenticacao(autenticacao);
            return autenticacao;
        }
    }
}

const gravaAutenticacao = (json) => {
    // decodificando para pegar o nome de usuário
    const decodificado = jwt_decode(json.token);
    json.nome_usuario = decodificado.nome_usuario;
    json.email_usuario = decodificado.email_usuario;
    console.log("autenticacao no grava autenticacao: " + JSON.stringify(json));
    localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify(json));
}

const logout = () => {
    // limpando o local storage
    localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify({ "auth": false, "token": "" }));
}

export default {
    pegaAutenticacao, gravaAutenticacao, logout
};