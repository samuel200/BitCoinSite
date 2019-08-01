import React, { useState } from 'react'
import axios from 'axios'
import url from '../DomainName'
import '../css/Auth.css'

export default function UserPasswordChange(){
    let [errorMessage, setErrorMessage] = useState("Error");
    let [loading, setLoading] = useState(false);
    const { username, userPassword } = JSON.parse(localStorage.getItem('authenticatedUser'));

    const showErrorMessage = (errorHolder, errorMessage)=>{
        setErrorMessage(errorMessage);
        setTimeout(()=>{
            errorHolder.style.animation = "2s slidedown";
        }, 500)
        errorHolder.style.animation = "";
    }

    const onSubmit = form =>{
        const newPassword = form.querySelector("input[name='new-password']");
        const errorHolder = form.querySelector("div.error-message");

        if(newPassword.value !== "" && userPassword.value !== newPassword.value){
            setLoading(true);
            axios.post(url.domain_url + "/password_change/" + username + "/", {password: newPassword.value})
                .then(response => {
                    setLoading(false);
                    newPassword.value = "";
                    showErrorMessage(errorHolder, "Password Change Successful")
                })
                .catch(error =>{
                    setLoading(false)
                    showErrorMessage(errorHolder, "Invalid password")
                })
        }else{
            if(newPassword.value === userPassword){
                showErrorMessage(errorHolder, "Password cannot be the same as the previous")
            }else{
                showErrorMessage(errorHolder, "Field value incorrect")
            }
        }
    }

    return(
        <form method="POST" action={url.domain_url+"/password_change/"} onSubmit={e=>{
            e.preventDefault()
            onSubmit(e.target)    
        }}>
            <h3>Change Password</h3>
            <div style={{position: "relative"}}>
                <div className="error-message">{ errorMessage }</div>
                <input type="password" placeholder="Old Password" name="old-password" value={ userPassword }/>
                <input type="password" placeholder="New Password" name="new-password"/>
                <i className="fas fa-spinner" style={{display: loading ? "block" : "none"}}></i>
                <input type="submit" value="Submit" disabled={!loading ? false : true} />
            </div>
        </form>
    )
} 