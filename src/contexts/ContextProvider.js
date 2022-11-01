import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const ContextProvider = ({children}) => {
  const [inputUsername, setInputUsername] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  return (
    <UserContext.Provider
      value={{
        inputUsername,
        setInputUsername,
        inputPassword,
        setInputPassword
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);