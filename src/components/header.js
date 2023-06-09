import React from "react";
import '../styles/filterpage.css'
import Modal from 'react-modal';

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

class Header extends React.Component{
    constructor(){
        super();
        this.state={
            loginModal:false
        }
      }
    handleModal = (state, value) => {
        this.setState({ [state]: value });
      }
      logout = () => {
        window.open("http://localhost:5500/auth/logout", "_self");
    }

    google = () => {
        window.open("http://localhost:5500/auth/google", "_self");
    }
      
    render(){
        const{loginModal} = this.state;
        const {user}=this.props;
        return(
            <>
         <div className="header">
    <div className="logo"> e!</div> 
    {console.log(user)}
    { !user?(
            <div className="left">
            <div className="item1" onClick={()=> this.handleModal("loginModal",true)}>Login</div>
              <div className="item">
                <button className="button">Create an account</button>
              </div>
            </div>
        ):(
          <div style={{ textAlign: 'end' }}>
          <img className="img-thumbnail circle me-3" src={user.photos[0].value} alt="Avatar" style={{ width: "40px", height: "40px" }} />
          <a className="text-white p-2">{user.displayName}</a>
          <button type="button" className="btn btn-danger" onClick={this.logout}>Logout</button>
        </div>
        
        )
    }
   
  </div>

  <Modal
        isOpen={loginModal}
        style={customStyles}
      >
       <div style={{float: "right", margintop: "-22px", marginright: "-16px"}} onClick={() => this.handleModal('galleryModal', false)}><i class="bi bi-x-circle-fill"></i></div>
        <div className="bg-primary bg-gradient p-4 text-white" onClick={this.google}>
        <i class="bi bi-google px-3"></i>Google
        </div>
      
      </Modal>
            
            </>
        )
    }
}

export default Header;