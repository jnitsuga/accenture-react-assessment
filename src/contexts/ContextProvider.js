import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const ContextProvider = ({children}) => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  return (
    <UserContext.Provider
      value={{
        inputEmail,
        setInputEmail,
        inputPassword,
        setInputPassword
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);