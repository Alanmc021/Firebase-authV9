import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";

export const Home = () => {
  const { user, signOut } = useContext(AuthGoogleContext);
  let userLogado = JSON.parse(user);
  return (
    <div>
      <h1>Bem vindo: {userLogado.displayName || "Novo user"}</h1>       
      <button onClick={() => signOut()}>sair</button>
    </div>
  );
};
