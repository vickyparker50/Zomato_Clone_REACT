import React from "react";
import '../styles/Homepage.css'
import Banner from "./Homepage_banner";
import Qserch from "./Homepage_quikesearch";


import axios from "axios";
class Home extends React.Component{
    constructor(){
        super();
        this.state={
            location:[]

        }
    }
    componentDidMount(){
        axios({
            url:"http://localhost:5500/location",
            method:"GET",
            headers:{'content-Type':'application/JSON'}
        })
        .then(res=>{
            this.setState({location:res.data.location})
        })
        .catch(err => console.log(err))

         
        axios({
            url:"http://localhost:5500/mealtype",
            method:"GET",
            headers:{'Content-Type':'application/JSON'}
        })
        .then(res=>{
            this.setState({mealtype:res.data.mealtype})
        })
        .catch(err =>console.log(err))
    }
    render(){
        const {location,mealtype}=this.state;
        return(
            <>
            <Banner locationData ={location}/>
  {/* ==============card sec======================== */}
          <Qserch mealtypeData ={mealtype}/>
</>

        
        )
    }
}


export default Home;