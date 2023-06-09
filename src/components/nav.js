import React from "react";

import { useNavigate } from "react-router-dom";


const navHood = (Component)=>{
    return(props)=>{
        const navigate = useNavigate();
        return <Component navigate ={navigate} {...props}/>

    }
}
export default navHood;