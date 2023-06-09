import React from "react";
import '../styles/filterpage.css'
import '../styles/details.css'
import queryString from "query-string";
import axios from "axios";
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



const customStyles = {
  overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.9)"
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
class Details extends React.Component{
  constructor(){
    super();
    this.state={
      restaurant:[],
      galleryModal:false,
      menuModal: false,
      menuresid: undefined,
      menuItems: [],
      subtotal: 0,
      
    }
  }
  componentDidMount(){
   const qs= queryString.parse(window.location.search);
   const{restaurants} = qs;
 
  axios({
    url:`http://localhost:5500/restaurantdetails/${restaurants}`,
    method:"GET",
    headers:{'Content-Type':'application/JSON'}
  })
  .then(res=>{
    this.setState({restaurant:res.data.restaurants,menuresid: restaurants})
    
  })
  .catch(err =>console.log(err))
}
handleModal = (state, value) => {
  const { menuresid } = this.state;
  
  if (state == "menuModal" && value == true){
      axios({
          url: `http://localhost:5500/menuitems/${menuresid}`,
          method: "GET",
          headers: { 'Content-Type': 'application/JSON' }
      })

      .then(res => {
          this.setState({ menuItems: res.data.restaurants })
      })
      .catch(err => console.log(err))
  }

  this.setState({ [state]: value });
}
addItems = (index, operationType) => {
  let total = 0;
  const items = [...this.state.menuItems];
  const item = items[index];

  if (operationType == 'add'){
      item.qty += 1;
  }else{
      item.qty -= 1;
  }
  items[index] = item;

  items.map((x) => {
      total += x.qty * x.price;
  })
  this.setState({ menuItems: items, subtotal: total})
}
initPayment = (data) => {
  const options = {
      key: "rzp_test_M6jgkRSJLUgWZv",
      amount: data.amount,
      currency: data.currency,
      description: "Test Transaction",
      order_id: data.id,

      handler: async(response) => {
          try {
              const verifyUrl = "http://localhost:5500/api/payment/verify";
              const { data } = await axios.post(verifyUrl, response);
              console.log(data);
          } catch (error) {
              console.log(error);
          }
      }
  };
  console.log(options);
  const rzp = new window.Razorpay(options);
  rzp.open();
}

handleSubmitAndPayment = async () => {
  // Extract form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const contactNumber = document.getElementById('contactNumber').value;

  // Create an object with the form data
  const formData = {
    name,
    email,
    address,
    contactNumber
  };

  try {
    // Send the form data to the server
    const response = await axios.post('http://localhost:5500/submit-form', formData);

    // Handle the response if needed
    console.log(response.data);

    // Handle payment
    const { subtotal } = this.state;
    const orderUrl = "http://localhost:5500/api/payment/orders";
    const { data } = await axios.post(orderUrl, { amount: subtotal });
    console.log(data);
    this.initPayment(data.data);
  } catch (error) {
    // Handle any errors that occurred during the form submission or payment
    console.error(error);
  }
};

    render(){
      const{restaurant,galleryModal , menuModal, menuItems, subtotal, formModal} = this.state;
    
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
  </div> */}

  <div>

  <img src={restaurant.thumb} id="bodybox" alt=""/>
  <button id="clickgally" onClick={()=>this.handleModal('galleryModal',true)}>Click to see Image Gallery</button>
</div>

{
  <h1 id="resname">{restaurant.name}</h1>
}
<div>
  <button id="plsbut"onClick={() => this.handleModal('menuModal', true)}>Place Online Order</button>
</div>
  <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
    <li className="nav-item" role="presentation">
      <button
        className="nav-link active"
        id="pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
      >
        Overview
      </button>
    </li>
    
    <li className="nav-item" role="presentation">
      <button
        className="nav-link"
        id="pills-contact-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-contact"
        type="button"
        role="tab"
        aria-controls="pills-contact"
        aria-selected="false"
      >
        Contact
      </button>
    </li>
  </ul>
  <hr id="underlinehr"/>
  <div className="tab-content" id="pills-tabContent">
    <div
      className="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
    <h1 id="abtps">About this place</h1>
    <div className="resdetials">
    <div className="conhead">Cuisine</div>
    <div className="conview">{restaurant && restaurant.Cuisine && restaurant.Cuisine.map(cuisine=>`${cuisine.name},`)}</div>
    <div className="conhead">Average Cost</div>
    <div className="conview">&#8377;{restaurant.cost} for two people (approx.)</div>
    </div>
    </div>
    <div
      className="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
     
    </div>
    <div
      className="tab-pane fade"
      id="pills-contact"
      role="tabpanel"
      aria-labelledby="pills-contact-tab"
    >
       <div className="resdetials">
    <div className="conhead">Phone Number</div>
    <div className="conview02">{restaurant.contact_number}</div>
    <div className="conhead">{restaurant.name}</div>
    <div className="conview">{restaurant.address}</div>
    </div>
    </div>
    <Modal
        isOpen={galleryModal}
        style={customStyles}
      >
       <div style={{float: "right", marginBottom: "5px"}} onClick={() => this.handleModal('galleryModal', false)}><i class="bi bi-x-circle-fill"></i></div>
        <Carousel showThumbs={false} showStatus={false}>
        <div>
                <img src={restaurant.thumb}
                className="bannerImg" />
               
            </div>
             
            </Carousel>
      
      </Modal>
      <Modal
                    isOpen={menuModal}
                    style={customStyles}
                >
                    <div>
                        <div style={{float: "right", marginBottom: "5px"}} onClick={() => this.handleModal('menuModal', false)}><i class="bi bi-x-circle-fill"></i></div>
                        <div className="" >
                            <br />
                            <h3 className="restaurant-name">{restaurant.name}</h3>
                         
                            {menuItems?.map((item, index) => {
                                return <div style={{ width: '44rem', marginTop: '28px', marginBottom: '10px', borderBottom: '2px solid #dbd8d8' }}>
                                    <div className="" style={{ width: '44rem', margin: '' }}>
                                        <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                                <span className="card-body">
                                                    <h5 className="item-name">{item.name}</h5>
                                                    <h5 className="item-price">&#8377;{item.price}</h5>
                                                    <p className="item-descp">{item.description}</p>
                                                </span>
                                            </div>
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <img className="card-img-center title-img" src={`./img/${item.image}`} style={{
                                                    height: '90px',
                                                    width: '90px',
                                                    borderRadius: '5px',
                                                    marginTop: '2px',
                                                    marginLeft: '58px'
                                                }} />
                                                {item.qty == 0 ? <div>
                                                    <button className="add-button" onClick={() => this.addItems(index, 'add')}>Add</button>
                                                </div> :
                                                    <div className="add-number">
                                                        <button onClick={() => this.addItems(index, 'sub')} >-</button>
                                                        <span class="qty">{item.qty}</span>
                                                        <button onClick={() => this.addItems(index, 'add')} >+</button>
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                               <h3 className="item-total" >SubTotal : {subtotal} </h3>
                            <button className="btn btn-danger order-button pay"onClick={() => {
                                this.handleModal('menuModal', false);
                                this.handleModal('formModal', true);
                            }}id="paynowwww"> Pay Now</button>
                            <div className="card" style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', margin: 'auto' }}>

                            </div>
                        </div>
                    </div>
                        
                </Modal>

                <Modal
                    isOpen={formModal}
                    style={customStyles}
                >
                    <div style={{float: "right", marginBottom: "5px"}} onClick={() => this.handleModal('formModal', false)}><i class="bi bi-x-circle-fill"></i></div>
                    <div>
                        
                        <h2>{restaurant.name}</h2>
                        <div>
                            <label>Name : </label>
                            <input className="form-control" id="name" style={{ width: '400px' }}
                                type="text" placeholder="Enter your Name" />
                        </div>
                        <div>
                            <label>Email : </label>
                            <input className="form-control" id="email" style={{ width: '400px' }}
                                type="text" placeholder="Enter your Email" />
                        </div>
                        <div>
                            <label>Address: </label>
                            <input className="form-control" id="address" style={{ width: '400px' }}
                                type="text" placeholder="Enter your Address" />
                        </div>
                        <div>
                            <label>Contact Number : </label>
                            <input className="form-control" id="contactNumber" style={{ width: '400px' }}
                                type="tel" placeholder="Enter your Contact Details" />
                        </div>
                        <button className="btn btn-success"
                            style={{ float: 'right', marginTop: '20px' }}  onClick={this.handleSubmitAndPayment}  >Proceed</button>
                    </div>
                    
                      
                  
                        
                </Modal>

  </div>
</>


        
        )
    }
}

export default Details;