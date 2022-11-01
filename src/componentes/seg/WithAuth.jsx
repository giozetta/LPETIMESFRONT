import { Navigate } from "react-router-dom";
import Autenticacao from "./Autenticacao";

const WithAuth = (Component) => {

  const AuthRoute = () => {
    console.log("with auth: " + Autenticacao.pegaAutenticacao());
    const isAuth = Autenticacao.pegaAutenticacao() ? true : false;
    if (isAuth) {
      return <Component />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return AuthRoute;
};

export default WithAuth;