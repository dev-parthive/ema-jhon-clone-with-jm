import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const PrivateRoute = ({children}) => {
    // ekane parameter er moddhe children likhar karon holo  ei privateRoute compnenet er peter moddhe ja kicu thakbe oigulate amra user k auth cahara dhukte dibo na 

    const {user, loading} = useContext(AuthContext)
    // console.log(user.uid)
    const location = useLocation()

    if(loading){
        console.log('yes loading found')
        return <div >Loading.....</div>
    }

    if(user && user.uid){
        return children;
    }
    return <Navigate to="/login" state={{from : location}} replace></Navigate>
};

export default PrivateRoute;