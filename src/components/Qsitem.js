import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css"

const Qsitem =(props)=>{
    const{_id,name,content,image}=props.data;
    const nav = useNavigate();
    const Showfilter=()=>{
         nav('./filter',{replace:true})
    }
    return(
    <><div onClick={()=>Showfilter()}>

         <div className="row g-4 resbox">
             <div className="col-lg-2"></div>
             <div className="col-12 col-md-6 col-lg-3 product">
                 <img src={`./img/${image}`} className="img-fluid" id="proimg" />
                 <div className="px-4 my-auto">
                     <h6 className="Breakfast">{name}</h6>
                     <p className="prodetail">{content}</p>
                 </div>
             </div>
         </div>
     </div><br /></> 
                
)
}

export default Qsitem