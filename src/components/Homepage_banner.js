import React from "react";
import axios from "axios";
import navHood from "./nav";


class Banner extends React.Component{
  constructor(){
    super();
    this.state={
      restaurant:[],
      inputText:undefined,
      suggestion:[],
    }
  }
  handlelocationchange=(e)=>{
    const location= e.target.value;
    sessionStorage.setItem('location',location);
    axios({
      url:`http://localhost:5500/restaurant/${location}`,
      method:'Get',
      headers:{'Content-Type':'application/JSON'}
  })
  .then(res=>{
      this.setState({restaurant:res.data.restaurants})
  })
  .catch(err =>console.log(err))
  }
  handleInputchange=(event)=>{
    const {restaurant}=this.state;
    const inputText=event.target.value;
    let suggestion=[];
    suggestion=restaurant.filter(item=>item.name.toLowerCase().includes(inputText.toLowerCase()));
    this.setState({inputText,suggestion});

  }
  selectResturant=(ss)=>{
    this.props.navigate(`/details?restaurants=${ss}`);
  }

  showSuggestion=()=>{
    const{inputText,suggestion}= this.state;

    if (suggestion.length === 0 && inputText === undefined ){
      return null;
    }
    if (suggestion.length === 0 && inputText === '' ){
      return null;
     }
    
    if (suggestion.length===0 && inputText ){
      return(
        <li id="notfound">No Results Found!</li>
      )
     
    }
    return(
    suggestion.map((item,index)=>(
      <li key={index} id="suglist" onClick={()=>this.selectResturant(item._id)} >
        <img src={item.thumb} id="sugimg" alt=""/>
        <span id="sugname">{item.name}</span>
        <span id="suglocality">{item.locality}</span>
      </li>
    ))
    )
  }
    render(){
        const{locationData}=this.props
        console.log(locationData)
        return(
            <>
            <div className="bg-image">
    <div className="container-fluid img-fluid">
      <div>
        {/*login*/}
        {/* <div className="row text-end pt-4">
          <div className="col-5 col-sm-5 col-md-6 col-lg-7 col-xl-7 " />
          <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 text-end">
          <a className="px-4 login" href="/login">Login</a>

          </div>
          <div className="col-5 col-sm-5 col-md-4 col-lg-3 col-xl-3 text-start">
            <a href="/login" className="createacct px-2 py-1">
              crete an account
            </a>
          </div>
        </div> */}
        {/*center logo*/}
        <div className="row pt-4 mx-auto text-center mt-2">
          <div className="col-12">
            <p className="px-4 py-2 px-md-4 py-md-2 px-sm-4 py-sm-2 logo-qs">e!</p>
          </div>
        </div>
        {/*restaurant-title*/}
        <div className="row pt-4 text-center">
          <div className="col-12">
            <p className="restaurant-title">
              Find the best restaurants, cafés, and bars
            </p>
          </div>
        </div>
        {/*drop down(Please type a location)& search*/}
        <div className="row pt-4 mx-auto text-center search-bar-row" >
          <div className=" col-md-1 col-lg-3 col-xl-3" />
          {/*Please type a location*/}
          <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 ">
            <div className=" Pleasetypealocation ">
              <select className="  loactiondropdown" onChange={this.handlelocationchange}>
                <option className="selectarea">Please type a location</option>
                {
                  locationData.map((item=>{
                    return(
                      <option className="selectarea" value={item.city_id}>{`${item.name}`}</option>
                    )
                  }))
                }
                <option className="selectarea">Jay Nagar, Bengaluru</option>
              </select>
            </div>
          </div>
          {/*search*/}
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 Search "id="serid">
            <div className="input-group">
              <span className="input-group-text bi bi-search" />
              <input
                className="mainLoginInput text-start form-control"
                type="text"
                placeholder="Search for restaurants" onChange={this.handleInputchange}
              />
              <ul id="sugeslist">{this.showSuggestion()}</ul>
            </div>
            <div className=" col-md-1 col-lg-2 col-xl-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
  
            </>
        )
    }
}
export default navHood(Banner);