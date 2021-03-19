import React, { Component } from 'react';
import axios from 'axios';
import './community.css';
import './login.css';
import logo from './logo3.jpeg';
import './users.css'

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



class HomeComponentCurrent extends Component {


    constructor(props) {
        super(props);
        this.state = {
          json: [],
          category : "all",
          update : false
        }
      }

    fetch(){
          axios.get('http://localhost:3011/users/admin/current')
          .then((response) => {
            console.log('resonse is', response.data.topic)
            this.setState({
              json: response.data.record
            });
          })
        }
      
      


    componentDidMount(){
        console.log('fetching...')
        this.fetch();
    }

    selectChange(e){
      this.setState(prevState => ({
        update : true,
        category : document.getElementById("cat").value
      }))
    }





 render (){
     const{json} = this.state
     return (
     <div>
         <HomeHeader></HomeHeader>
         <div class="home-main-container">
           <br/>
         
    <h1 class='headline'>Parking Space </h1>
         
         </div>
         <TopicList
         json = {this.state.json}
         ></TopicList>
        </div>
 )
}
}



class TopicList extends Component{
  render()
  {
    const{json} = this.props;
    var items = json.map(data => <  TopicItem data = {data}
      />);
  return (
    <div>
        {items}
    </div>
  )
  }
}

class TopicItem extends Component{

  render()
  {
    const{data} = this.props;
    return(
      <div key={data.id}>
                   <div class = 'bor'>

                    <div class="conn"><h3>{data.Vehicle}</h3></div>
                    <div class="flexContainer"><div class='item-1'>Name  </div><div class='item-2'>: {data.Name}</div> </div>
                    <div class="flexContainer"><div class='item-1'>Phone  </div><div class='item-2'>: {data.Phone}</div> </div>
                    <div class="flexContainer"><div class='item-1'>Slot  </div><div class='item-2'>: {data.Slot}</div> </div>
                    <div class="flexContainer"><div class='item-1'>Entry  </div><div class='item-2'>: {data.entry}</div> </div>

                   </div>
      </div>
    )
  }
}

export default HomeComponentCurrent;