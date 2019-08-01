import React, { useState } from 'react'

export default function Withdrawal() {
    let [loading, setLoading] = useState(false);
    let [errorMessage, setErrorMessage] = useState("Error");

    const showErrorMessage = (errorHolder, errorMessage)=>{
        setErrorMessage(errorMessage);
        setTimeout(()=>{
            errorHolder.style.animation = "2s slidedown";
        }, 500)
        errorHolder.style.animation = "";
    }

    const onSubmit = e =>{
        e.preventDefault();
        const form = e.target;
        const inputs = form.querySelectorAll("input");
        const errorHolder = form.querySelector("div.error-message");
        let blank = false;

        inputs.forEach(input=>{
            if(input.value == ""){
                showErrorMessage(errorHolder, "Empty field submitted")
                blank = true;
                return ;
            }
        })

        if(!blank){
            setLoading(true);
            setTimeout(()=>{
                inputs.forEach(input=>{
                    input.value = ""
                })
                setLoading(false);
                showErrorMessage(errorHolder, "Payment Request Successful");
            }, 4000)
        }
    }
    return (
        <div>
            <h2>Withdrawal</h2>
            <form onSubmit={ onSubmit }>
                <div id="withdrawal-form" style={ {position: 'relative', background: "#2f3e47 !important"} }>
                    <div className="error-message">{ errorMessage }</div>
                    <p>Make sure you provide a valid <b>Bitcoin Wallet Address</b> to avoid payment issues.</p>
                    <input type="text" name="text" placeholder="Bitcoin Wallet Address"/>
                <div>
                    <i className="fas fa-spinner fa-spin" style={{display: loading ? "inline" : "none"}}></i>
                    <input type="submit" value="Submit" disabled={!loading ? false : true}/></div>
                </div>
            </form>
        </div>
    )
}
