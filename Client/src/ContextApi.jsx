import { createContext, useState } from "react";

export const Context = createContext();

const Contextfun = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <Context.Provider value={{ email, setEmail, password, setPassword, isAuthenticated, setIsAuthenticated, refresh, setRefresh, loading, setLoading }}>
            {children}
        </Context.Provider>
    )

}

export default Contextfun;


