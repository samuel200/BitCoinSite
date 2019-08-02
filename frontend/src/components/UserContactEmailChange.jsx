import React, { useState } from 'react'
import url from '../DomainName'
import axios from 'axios'


export default function UserContactEmailChange({ userProfile }) {
    let [errorMessage, setErrorMessage] = useState("Error");
    let [loading, setLoading] = useState(false);

    const showErrorMessage = (errorHolder, errorMessage)=>{
        setErrorMessage(errorMessage);
        setTimeout(()=>{
            errorHolder.style.animation = "2s slidedown";
        }, 500)
        errorHolder.style.animation = "";
    }

    const onSubmit = form =>{
        const { username } = JSON.parse(localStorage.getItem('authenticatedUser'));
        const email = form.querySelector("input[name='email_change']");
        const errorHolder = form.querySelector("div.error-message");
        if(email.value !== ""){
            setLoading(true);
            axios.post(url.domain_url + "/email_change/" + username + "/", {email: email.value})
                .then(response => {
                    setLoading(false);
                    email.value = "";
                    showErrorMessage(errorHolder, "Email Changed Successfully")
                })
                .catch(error =>{
                    setLoading(false)
                    showErrorMessage(errorHolder, "Invalid email")
                })
        }
    }

    return (
        <form method="POST" action={ url.domain_url+"/email_change/" } onSubmit={e=>{
            e.preventDefault()
            onSubmit(e.target)    
        }}>
            <h3>Change Email</h3>
            <div style={{position: "relative"}}>
                <div className="error-message">{ errorMessage }</div>
                <input type="email" value={ `${ userProfile.email }` }/>
                <input type="email" name="email_change" placeholder="New Email"/>
                <i className="fas fa-spinner" style={{display: loading ? "block" : "none"}}></i><input type="submit" value="Submit" disabled={!loading ? false : true} />
            </div>
        </form>
    )
} 
