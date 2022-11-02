import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const ContextProvider = ({children}) => {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [user, setUser] = useState({});
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [productsList, setProductsList] = useState([]);

  return (
    <UserContext.Provider
      value={{
        inputUsername,
        setInputUsername,
        inputPassword,
        setInputPassword,
        product,
        setProduct,
        user,
        setUser,
        productsList,
        setProductsList,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);