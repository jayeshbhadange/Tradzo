import React from 'react'
import {useRef, useEffect, useState, useContext} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const LOGIN_URL = '/login';
const Login = () => {
    const userRef=useRef("");
    const errRef=useRef("");
    const {setAuth}=useAuth();
    const navigate=useNavigate();
    const location=useLocation();
    const from=location?.state?.from?.pathname || '/';
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(()=>{
        userRef.current.focus();
    },[]);

    useEffect(()=>{
        setErrMsg("");
    },[user,pwd])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(true);
        /*try{
            const response=await axios.post(LOGIN_URL,
                JSON.stringify({username:user,password:pwd}),
                {
                    headers:{'Content-Type':'application/json'},
                    withCredentials:true
                })
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser("");
            setPwd("");
            navigate(from, { replace: true });
        }catch(err){
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }*/
    }
    return (

            <section>
                <p ref={errRef} className={errMsg?"errmsg":"offscreen"}
                aria-live="assertive"
                >
                    {errMsg}
                </p>
                <h1>
                    Sign in
                </h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input
                        id="username"
                        ref={userRef}
                        type="text"
                        required
                        autoComplete='off'
                        onChange={(e)=>setUser(e.target.value)}
                        value={user}
                    />
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        required
                        onChange={(e)=>setPwd(e.target.value)}
                        value={pwd}
                    />
                    <button>
                        Sign in
                    </button>
                </form>
                <p>
                    Need an Account? Register here<br />
                    <span className="line">
                        <Link to="/register">Sign Up</Link>
                    </span>
                </p>
            </section>

    )
}

export default Login