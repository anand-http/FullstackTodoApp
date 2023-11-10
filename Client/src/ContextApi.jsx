import { createContext, useState } from "react";

export const Context = createContext();

const Contextfun = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    return (
        <Context.Provider value={{ isAuthenticated, setIsAuthenticated, refresh, setRefresh, loading, setLoading }}>
            {children}
        </Context.Provider>
    )

}

export default Contextfun;


