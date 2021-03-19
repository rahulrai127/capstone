import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './community.css';
import  { Redirect } from 'react-router-dom'
import './register.css';

import HomeHeader from './HomeHeader'





class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isValidated: false,
          isBooked: false,
          isExit: true,
          isMatched : false,
          slot : " "
        }
      }
    
      handleCancelClick(e){
        this.setState({ isCancled: true })
      }

      handleClickValidate(e) {
        e.preventDefault();
        console.log(document.getElementById("username").value," ",document.getElementById("phone").value," ",document.getElementById("vehicle").value);
        if(document.getElementById("username").value == "" ||document.getElementById("phone").value==" "||document.getElementById("vehicle").value=="")
        {
            alert("please fill all the field to continue");
        }
        else{
        axios.get('http://localhost:5000/validate/entry').then((response) => {
        console.log('response is', response.data)  
        this.setState({ slot: " " })
        this.setState({isValidated : true});
        this.setState({isBooked : false});
        this.setState({isExit : false});
        if(response.data == document.getElementById("vehicle").value)
        {
          this.setState({isMatched: true})
        }
      })
      axios.get('http://localhost:3011/users/admin/police',{   
        "username" : document.getElementById("username").value,
        "phone" : document.getElementById("phone").value,
        "vehicle" : document.getElementById("vehicle").value
    }).then((response) => {
        console.log('response is', response.data);
        if(response.data == 1)
        {
          console.log("stolen car found",document.getElementById("vehicle").value)
        }
      })
    }     
        
    }


    handleClickEntry(e) {
        e.preventDefault();
        console.log(document.getElementById("username").value," ",document.getElementById("phone").value," ",document.getElementById("vehicle").value);
        if(document.getElementById("username").value == "" ||document.getElementById("phone").value==" "||document.getElementById("vehicle").value=="")
        {
            alert("please fill all the field to continue");
        }
        else{
        axios.post('http://localhost:3011/users/entry',
            {   
                "username" : document.getElementById("username").value,
                "phone" : document.getElementById("phone").value,
                "vehicle" : document.getElementById("vehicle").value
            }
        )
      .then((response) => {
        console.log('resonse is', response.data)  
        this.setState({ slot: response.data });
        this.setState({isValidated : true});
        this.setState({isBooked : true});
        this.setState({isExit : false});
      })
    }     
    }

    handleClickExit(e) {
      e.preventDefault();
      console.log(document.getElementById("username").value," ",document.getElementById("phone").value," ",document.getElementById("vehicle").value);
      if(document.getElementById("username").value == "" ||document.getElementById("phone").value==" "||document.getElementById("vehicle").value=="")
      {
          alert("please fill all the field to continue");
      }
      else{
      axios.post('http://localhost:3011/users/exit',
          {   
              "username" : document.getElementById("username").value,
              "phone" : document.getElementById("phone").value,
              "vehicle" : document.getElementById("vehicle").value,
              "slot" : this.state.slot
          }
      )
    .then((response) => {
      console.log('response is', response.data)  
      this.setState({ slot: "" })
      this.setState({isValidated : false});
      this.setState({isBooked : false});
      this.setState({isExit : true});
      this.setState({isMatched: false});
    })
  }     
      
  }
    render(){
        if (this.state.isSignedUp) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/" }} />;
        }
        if (this.state.isCancled) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/" }} />;
        }
        return (
          <div>
            <HomeHeader></HomeHeader>
          
            <div class="register-main-container">
            <div class="register-main-header">
            Book your parking SPOT
            </div>
            
            <hr/><br/>
            <div class="register-text">
            Name 
            </div>
            <input type="text" id="username"/> 
            <br/>
            <div class="register-text">
            Phone Number
            </div>
            <input type="text" id="phone"/>
            <br/>
            <div class="register-text">
            Vehicle Number 
            </div>
            <input type="text" id="vehicle"/>
            <br/>
            <hr/>
            
            <div class="register-btn-collections">

                    {(this.state.isBooked == false && this.state.isValidated == false && this.state.isExit == true) ?<div >Click on validate to continue <br></br><br></br> </div> : 
                    (this.state.isBooked == false && this.state.isValidated == true && this.state.isExit==false && this.state.isMatched==true)?<div>Validation Successful, Now book your parking slot <img src = "data:image/png;base64,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"></img><br></br><br></br></div>:
                    (this.state.isBooked == false && this.state.isValidated == true && this.state.isExit==false && this.state.isMatched==false)?<div>Validation Failed, Please try again <img src="data:image/png;base64,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"></img><br></br><br></br></div>:
                    (this.state.isBooked == true && this.state.isValidated == true && this.state.isExit== false)?<div>Validation Successful, Now book your parking slot <img src = "data:image/png;base64,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"></img><br></br><br></br><div>Your Parking SLOT : {this.state.slot} <br></br><br></br></div></div>:
                    <button class="register-footer-register-btn " onClick={this.handleCancelClick.bind(this)}><div class = "footer-resgister">Cancel</div></button>}
                    

                    {(this.state.isBooked == false && this.state.isValidated == false && this.state.isExit == true) ?<button type='button' class="register-footer-login-btn " onClick={this.handleClickValidate.bind(this)}><div class = "footer-login">Validate Vehicle Number</div></button> : 
                    (this.state.isBooked == false && this.state.isValidated == true && this.state.isExit==false && this.state.isMatched == true)?<button type='button' class="register-footer-login-btn " onClick={this.handleClickEntry.bind(this)}><div class = "footer-login">Book Parking SPOT</div></button> :
                    (this.state.isBooked == false && this.state.isValidated == true && this.state.isExit==false && this.state.isMatched == false)?<button type='button' class="register-footer-login-btn " onClick={this.handleClickValidate.bind(this)}><div class = "footer-login">Validate Vehicle Number</div></button> :
                    (this.state.isBooked == true && this.state.isValidated == true && this.state.isExit== false)?<button type='button' class="register-footer-login-btn " onClick={this.handleClickExit.bind(this)}><div class = "footer-login">EXIT parking</div></button>:
                    <button class="register-footer-register-btn " onClick={this.handleCancelClick.bind(this)}><div class = "footer-resgister">Cancel</div></button>}

                    

                    
            </div>
            
        </div>
        </div>
        )
    }
}
export default Register;