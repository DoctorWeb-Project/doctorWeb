import {createContext, useContext, useState} from 'react'


export const UserContext = createContext({})

export const UserContextProvider = ({children})=>{
    const [ userToken, setUserToken] = useState()

    function saveUserTokenToStorage(data){
        localStorage.setItem('token', data.token)
        localStorage.setItem('userName', data.user)
        setUserToken(data.token)
    }

    function getUserDataFromStorage(){
        setUserToken(localStorage.getItem('token'))
    }

    function clearDataFromStorage(){
        localStorage.removeItem('token')
        setUserToken(null)
    }


    return(
        <UserContext.Provider value={{
            getUserDataFromStorage,
            clearDataFromStorage,
            saveUserTokenToStorage,
            userToken
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}

