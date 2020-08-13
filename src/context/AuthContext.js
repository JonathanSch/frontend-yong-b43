import React, { useState, createContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import decode from 'jwt-decode'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const history = useHistory()
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const encodedToken = localStorage.getItem('token')
        if (encodedToken !== 'undefined' && encodedToken !== null) {
            const decodedToken = decode(encodedToken)
            const userData = {
                id: decodedToken.id,
                email: decodedToken.email,
                name: decodedToken.name
            }
            setUser(userData)
            setToken(encodedToken)
        }
    }, [])

    const addToken = (token) => {
        localStorage.setItem('token', token)
        setToken(token)
        return history.push('/users')
    }

    const removeToken = () => {
        localStorage.removeItem('token')
        setToken(null)
        return history.push('/')
    }

    return(
        <AuthContext.Provider value={{ user, token, addToken, removeToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider