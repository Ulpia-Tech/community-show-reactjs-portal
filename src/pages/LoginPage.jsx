import { useState} from "react";
import { useAuthApi } from "../services/auth.service";
import "./LoginPage.css"
import logo from "../assets/images/nancyvet-logo.png";

import { useNavigate } from "react-router-dom";

import {IF} from '../components/conditions/IF'

export const LoginPage = () => {

    const [username , setUsername   ] = useState('');
    const [password , setPassword   ] = useState('');
    const [error    , setError      ] = useState('');

    const { login }                   = useAuthApi();
    const navigate                    = useNavigate();

    /**
     * @author Mihail petrov
     * @returns void
     */
    const handleSubmit = async () => {

        const responeObject = await login({ username, password });

        if(responeObject.hasError) {
            return setError(responeObject.message);
        }

        navigate("dashboard", { replace: true });
    };

    return <>

        <div className="wrapper">

            <div className="signin-wrapper">
                <div className="signin-header">
                    <img 
                        className="app-logo" 
                        src={logo} 
                        alt="Vet Logo" />
                    <div 
                        className="app-title">Vet Manager
                    </div>
                </div>

                <div className="signin-content">


                    <IF condition={error}>
                        <div className="error-panel">
                            {error}
                        </div>
                    </IF>

                    <div className="mt16">
                        <label className="input-label mt16" htmlFor="username">E-mail / Username</label>
                        <input 
                            className="input-text mt8" 
                            id="username" 
                            type="text"
                            value={ username }
                            onChange={ (e) => setUsername(e.target.value) }/>
                        
                        <label className="input-label mt16" htmlFor="password">Password</label>
                        <input 
                            className="input-text mt8" 
                            id="password" 
                            type="password"
                            value={ password }
                            onChange={ (e) => setPassword(e.target.value) }/>

                    </div>

                    <div className="mt16 c-blue">
                        Reset your password
                    </div>

                    <div className="btn btn--full mt16" onClick={ handleSubmit }>
                        Sign in
                    </div>
                </div>
            </div>
        </div>
    </>
};