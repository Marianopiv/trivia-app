import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";
import { useState } from "react";


const useAuth = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const [user, setUser] = useState({displayName:"",email:""});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);



    const signInWithGoogle = async () => {
    // Crea una instancia del proveedor de autenticación de Google
    const provider = new GoogleAuthProvider();

    // Inicia sesión con una ventana emergente (popup)
    try {
      const result = await signInWithPopup(auth, provider);
      // Si la autenticación es exitosa, el usuario estará disponible en result.user
      setUser(result.user)
      console.log(result.user)
      setIsAuthenticated(true)
      
    } catch (error) {
      console.error("Error en la autenticación:", error);
    }
  };
  return {signInWithGoogle,user}
}

export default useAuth