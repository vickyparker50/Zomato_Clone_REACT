import axios from "axios";
import React from "react";
import navHood from "./nav";
import '../styles/filterpage.css'

class Filter extends React.Component{
  constructor(){
    super();
    this.state={
      restaurant:[],
      //for onclick loction it give result on card
      location:[],
      locat:undefined,
      // end
      sort:1,
      page:1,
      selectedLocation: ""
      
    }
  }
  componentDidMount(){
   axios({
     url:`http://localhost:5500/filter`,
     method:"POST",
     headers:{'Content-Type':'application/JSON'}
   })
   .then(res=>{
     this.setState({restaurant:res.data.restaurants})
     console.log(res.data.restaurants)
   })
   .catch(err =>console.log(err))
  //  for onclick loction it give result on card
   axios({
    url:"http://localhost:5500/location",
    method:"GET",
    headers:{'content-Type':'application/JSON'}
})
.then(res=>{
    this.setState({location:res.data.location})
})
.catch(err => console.log(err))
 }
 handlelocationchange =(val)=>{
  const{sort,page,lcost,hcost}=this.state;
  const locat =val.target.value;
  
  //const {mealtype, cuisine, lcost, hcost, sort, page}=this.state;
  const filterobj ={
    location:locat,
    lcost,
    hcost,
    sort,
    page,
    
  };
  axios({
    url:`http://localhost:5500/filter`,
    method:"POST",
    headers:{'Content-Type':'application/JSON'},
    data:filterobj
  })
  .then(res=>{
    this.setState({restaurant:res.data.restaurants,locat})
    console.log(res.data.restaurants)
  })
  .catch(err =>console.log(err))

 }
//   end for onclick loction it give result on card
handlesort=(sort)=>{
  const{locat,page,lcost,hcost,cuisine}=this.state;
  const filterobj ={
    location:locat,
    lcost,
    hcost,
    sort,
    page,
    cuisine:[cuisine]
  };
  axios({
    url:`http://localhost:5500/filter`,
    method:"POST",
    headers:{'Content-Type':'application/JSON'},
    data:filterobj
  })
  .then(res=>{
    this.setState({restaurant:res.data.restaurants,sort})
    console.log(res.data.restaurants)
  })
  .catch(err =>console.log(err))

}
handlepagechange=(page)=>{
  const{locat,sort,lcost,hcost,cuisine}=this.state;
  const filterobj ={
    location:locat,
    lcost, 
    hcost,
    sort,
    page,
    cuisine:[cuisine]
  };
  axios({
    url:`http://localhost:5500/filter`,
    method:"POST",
    headers:{'Content-Type':'application/JSON'},
    data:filterobj
  })
  .then(res=>{
    this.setState({restaurant:res.data.restaurants,sort,page})
    console.log(res.data.restaurants)
  })
  .catch(err =>console.log(err))


}
handleprice=(lcost, hcost)=>{
  const{locat,sort,page,cuisine }=this.state;
  const filterobj ={
    location:locat,
    lcost, 
    hcost,
    sort,
    page,
    cuisine:[cuisine]
  };
  axios({
    url:`http://localhost:5500/filter`,
    method:"POST",
    headers:{'Content-Type':'application/JSON'},
    data:filterobj
  })
  .then(res=>{
    this.setState({restaurant:res.data.restaurants,sort,page,lcost, hcost})
    console.log(res.data.restaurants)
  })
  .catch(err =>console.log(err))

}
 handleCuisine=(cuisine)=>{
  const{locat,sort,page,lcost,hcost }=this.state;
  const filterobj ={
    location:locat,
    lcost, 
    hcost,
    sort,
    page,
    cuisine:[cuisine]
    
  };
  axios({
    url:`http://localhost:5500/filter`,
    method:"POST",
    headers:{'Content-Type':'application/JSON'},
    data:filterobj
  })
  .then(res=>{
    this.setState({restaurant:res.data.restaurants,sort,page,lcost, hcost,cuisine})
    console.log(res.data.restaurants)
  })
  .catch(err =>console.log(err))

}
handlenavigate=(id)=>{
  this.props.navigate(`/details?restaurants=${id}`);
}
    render(){
      const{location,restaurant}=this.state;
        return(
            
            <>
  {/* <div className="header">
    <div className="logo"> e!</div>
    <div className="left">
      <div className="item1">Login</div>
      <div className="item">
        <button className="button">Create an account</button>
      </div>
    </div>
  </div> */}``
  <div className="heading">Breakfast Places in India</div>
  {/* filter side start */}
  <div className="Filters">
    <p className="filterhead">Filters</p>
    {/* for onclick loction it give result on card */}
    <p className="filterLocation    ">Select Location</p>
    <select className="location " onChange={this.handlelocationchange}>
      <option disabled="" selected="">
        Select Location
      </option>
      {
                  location.map((item=>{
                    return(
                      <option className="selectarea" value={item.city_id}>{`${item.name}`}</option>
                    )
                  }))
                }
    </select>
    {/* end */}
    <div>
  <p className="filtercheck">Cuisine</p>
  <div className="Cuisine">
    <input type="checkbox" className="check1" onChange={() => this.handleCuisine(1)} />
    <label className="check">North Indian</label> <br />
    <input type="checkbox" className="check1" onChange={() => this.handleCuisine(2)} />
    <label className="check">South Indian</label>
    <br />
    <input type="checkbox" className="check1" onChange={() => this.handleCuisine(3)} />
    <label className="check">Chinese</label>
    <br />
    <input type="checkbox" className="check1" onChange={() => this.handleCuisine(4)} />
    <label className="check">Fast Food</label>
    <br />
    <input type="checkbox" className="check1" onChange={() => this.handleCuisine(5)} />
    <label className="check">Street Food</label>
    <br />
  </div>
</div>

    <div>
      <p className="filterradio">Cost For Two</p>
      <div className="cost">
        <input type="radio" name="radio"   className="check2" onChange={()=>this.handleprice(1,500)} />
        <label className="check5">Less than ₹500</label> <br />
        <input type="radio" name="radio" className="check2" onChange={()=>this.handleprice(500,1000)} />
        <label className="check5">₹ 500 to ₹1000</label>
        <br />
        <input type="radio" name="radio" className="check2"onChange={()=>this.handleprice(1000,1500)} />
        <label className="check5">₹1000 to ₹1500</label>
        <br />
        <input type="radio" name="radio" className="check2"onChange={()=>this.handleprice(1500,2000)} />
        <label className="check5">₹1500 to ₹2000</label>
        <br />
        <input type="radio" name="radio" className="check2" onChange={()=>this.handleprice(2000,5000)}/>
        <label className="check5">₹2000+</label>
        <br />
      </div>
    </div>
    <div>
      <p className="filtersort">Sort</p>
      <div className="Sort">
        <input type="radio" name="radio1" onChange={()=>this.handlesort(1)} className="check3" />{" "}
        <label className="check4">Price low to high</label> <br />
        <input type="radio" name="radio1" onChange={()=>this.handlesort(-1)} className="check3" />{" "}
        <label className="check4">Price high to low</label>
        <br />
      </div>
    </div>
  </div>
  {/* fiter side end */}
  {/* =============================== result start ==================================*/}
  <div className="result">
    {restaurant.length !==0 ?
      restaurant.map((item)=>{
        return(
<div className="result1" onClick={()=>this.handlenavigate(item._id)}>
      <div>
        <div className="pic">
          <img src={item.thumb} alt="" />
        </div>
        <div className="right">
          <p className="la">{item.name}</p>
          <p className="la1">{item.city_name}</p>
          <p className="la2">{item.address}</p>
        </div>
      </div>
      <hr className="hrline" />
      <div className="below">
        <div className="part">
          <p className="part1">CUISINES:</p>
          <p className="part2">COST FOR TWO:</p>
        </div>
        <div className="subpart">
          <p className="part3">{item.Cuisine.map((s)=>`${s.name},`)}</p>
          <p className="part4">₹{item.cost}</p>
        </div>
      </div>
    </div>
        )
      }) : <div>Sorry , No results found</div>
    }
    
    {/*========================================== 2nd box end ==============================*/}
  </div>
  {/* ============================================result ends ================================================*/}
  <div className="page">
    <button className="pageno" >&lt;</button>
    <button className="pageno"onClick={()=>this.handlepagechange(1)}>1</button>
    <button className="pageno"onClick={()=>this.handlepagechange(2)}>2</button>
    <button className="pageno"onClick={()=>this.handlepagechange(3)}>3</button>
    <button className="pageno"onClick={()=>this.handlepagechange(4)}>4</button>
    <button className="pageno"onClick={()=>this.handlepagechange(5)}>5</button>
    <button className="pageno">&gt;</button>
  </div>
</>

        
        )
    }
}

export default navHood(Filter);