import React, { createContext, useContext, useState } from "react";
import { login, register } from "../service/authService";
import { useNavigation } from '@react-navigation/native';
import LoginScreen from "../screens/loginScreen";
import { AuthRouteNames } from "../routes/route-names";



interface IAuthContext {
    token: string;
    login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
    token: '',
    login: async () => { },
})

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [token, setToken] = useState<string>('');


    const handleLogin = async (email: string, password: string) => {
        try {
            const result = await login(email, password);
            console.log('login: ', result)
            setToken(result.accessToken);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <AuthContext.Provider value={{
            token,
            login: handleLogin

        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
