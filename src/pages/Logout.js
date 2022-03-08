import { useContext, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import UserContext from "../UserContext";

const Logout = () => {
    const { unsetUser, setUser } = useContext(UserContext);

    unsetUser();
    
    useEffect(() => {
        setUser({
            id: null
        });
    }, [setUser]);
    
  return (
    <Redirect to="/" />
  )
}

export default Logout