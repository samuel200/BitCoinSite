import React, { useState } from 'react'

const hiddenStyle ={
    animation: "hide 1s forwards"
},

visibleStyle = {
    animation: "show 1s forwards"
};

export default function UserNavigationHolder({ navigations, changeCurrentPage, hidden, setHidden, setAuthentication, setAuthenticatedUser}) {
    let [width, setWidth] = useState(window.innerWidth);

    window.addEventListener('resize', e =>{
        setWidth(e.target.innerWidth)
    }, false)

    return (
        <div id="user-navigation-section" style={ width > 1080 ? visibleStyle : hidden ? hiddenStyle : visibleStyle}>
            <h4>Navigations</h4>
            {
                navigations.map( item => <a href="#" onClick={ e =>{
                    e.preventDefault();
                    changeCurrentPage(item.name);
                    if(width < 1080){
                        setHidden(true);
                    }else{
                        setHidden(false);
                    }
                }} style={{display: 'flex', justifyContent: 'space-evenly'}}><i className={ item.iconClass }></i> <i>{ item.name }</i></a>)
            }
            <a href="#" style={{display: 'flex', justifyContent: 'space-evenly'}} onClick={()=>{
                setAuthenticatedUser({})
                setAuthentication(false)
                localStorage.removeItem('authenticatedUser')
            }}><i className="fas fa-power-off"></i><i>sign out</i></a>
        </div>
    )
}


