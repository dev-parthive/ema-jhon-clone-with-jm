import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Login.css'
const Login = () => {

    const {signInUser, setUser} = useContext(AuthContext)
    const navigate = useNavigate()

    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleSubmit = (event) =>{
        event.preventDefault()
        const form = event.target;
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)
        
     
        signInUser(email, password)
        .then(result =>{
            const  user = result.user
            console.log(user)
            setUser(user)
            form.reset()
            navigate(from, {replace : true})
        })
        .catch(error=>{
            
            console.log(error)
        })
    }

    return (
        <div className='form-container'>
            <h3 className='form-title'>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="eamil" id="email" name="email" placeholder='Email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder='password' required />
                </div>
               <div className='btn-submit-container'>
               <input  className='btn-submit' type="submit" value="Login" />
               </div>
            </form>
            <p className='create-account-link'>New to Ema-john? <span ><Link to='/signup' >create an account</Link></span></p>
        </div>
    );
};

export default Login;