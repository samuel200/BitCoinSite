import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

import url from '../DomainName'


const showErrorMessage = (errorHolder, errorMessage, setErrorMessage)=>{
    setErrorMessage(errorMessage);
    setTimeout(()=>{
        errorHolder.style.animation = "2s slidedown";
    }, 500)
    errorHolder.style.animation = "";
}

const authenticate = (form, errorHolder, setErrorMessage, setAuthentication, setAuthenticatedUser, setLoading) =>{
    const email = form.querySelector("input[name=email]").value;
    const password = form.querySelector("input[name=password]").value;
    const emailTest = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    setLoading(true);
    if(emailTest.test(email)){
        axios.post(url.domain_url + "/login/", {email, password})
            .then(response => {
                const data = response.data;
                data.userPassword = password;
                localStorage.setItem("authenticatedUser", JSON.stringify(data))
                setAuthenticatedUser(response.data)
                setAuthentication(true)
                setLoading(false)
            })
            .catch(error =>{
                setLoading(false)
                showErrorMessage(errorHolder, "Invalid login details", setErrorMessage)
            })
    }
    else{
        setLoading(false);
        showErrorMessage(errorHolder, "invalid email", setErrorMessage)
    }
}


function LoginForm({ setAuthentication, setAuthenticatedUser }) {
    let [clicked, setClicked] = useState(false);
    let [errorMessage, setErrorMessage] = useState("Error");
    let [loading, setLoading] = useState(false);

    return (
        <div style={ {position: 'relative'} }>
            <div className="error-message">{ errorMessage }</div>
            <sub>Enter your username and password to login.</sub>
            <form action="#" method="post" onSubmit={ e =>{
                e.preventDefault();
                const errorHolder = e.target.parentNode.querySelector("div.error-message");
                
                authenticate(e.target, errorHolder, setErrorMessage, setAuthentication, setAuthenticatedUser, setLoading);
            }}>
                <input type="email" name="email" placeholder="Email Address"/>
                <div className="password-input">
                    <input type={!clicked ? "password" : "text"} name="password" placeholder="password"/>
                    <span>
                        <i className={ !clicked ? "fas fa-eye-slash" : "fas fa-eye"} onClick={ ()=>{
                            setClicked(!clicked)
                        } }></i>
                    </span>
                </div>
                <div><i className="fas fa-spinner fa-spin" style={{display: loading ? "inline" : "none"}}></i><input type="submit" value="Login" disabled={!loading ? false : true}/></div>
            </form>
            <div className="recovery-and-creation">
                <a href="#">Forgot password?</a>{"  "}
                <Link to="/auth/signup">Create an account.</Link>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);