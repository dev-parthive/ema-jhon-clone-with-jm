import { faRandom } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './SignUp.css'
const Signup = () => {
    const [error, setError] = useState(null);


    const {createUser} = useContext(AuthContext)
    const handleSubmit = (event) =>{
        event.preventDefault()
        const form = event.target;
        const email = form.email.value
        const password = form.password.value
        const confirmPassword = form.confirm.value;
        console.log(email, password, confirmPassword)
        
        if(password.length < 6){
            setError('Password should be 6 charecter or more ')
            return;
        }
        if(password !== confirmPassword){
            setError('Your password did\'t match ')
            console.log(error)
            return;
            
        }
        if(password === confirmPassword){
            setError(null)
        }
        createUser(email, password)
        .then(result =>{
            const  user = result.user
            console.log(user)
            form.reset()
        })
        .catch(error=>{
            
            console.log(error)
        })
    }
    return (
        <div>
           <div className='form-container'>
            <h3 className='form-title'>Sign Up</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="eamil" id="email" name="email" placeholder='Email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder='password' required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" id="confirm" name="confirm" placeholder='confirm password' required />
                </div>
               <div className='btn-submit-container'>
               <input className='btn-submit' type="submit" value="Sign Up" />
               </div>
            </form>
            <p className='create-account-link'>Already have an account ? <span ><Link to='/login' >Login</Link></span></p>
            <p className='text-error'>{error}</p>
        </div>
        </div>
    );
};

export default Signup;