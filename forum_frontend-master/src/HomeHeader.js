import React, { Component } from 'react';
import './community.css';
import  { Redirect } from 'react-router-dom'
import './login.css';
import logo from './logo3.jpeg';

class HomeHeader extends Component{

  constructor(props) {
    super(props);
    
  }
  

    render(){
        return(
            <div>
              <img class= "logooo" src={logo} alt="logo-img" /> 
        
        <div class="home-logo-container">
            
        </div>
        <div class="home-main-header">
        <div className = "leftAling">
            </div>
        </div>
        <div class="home-main-container">
                <div class="home-content"></div>
            </div>
          {console.log(!undefined)}
        </div>
        )}
    }


export default HomeHeader;