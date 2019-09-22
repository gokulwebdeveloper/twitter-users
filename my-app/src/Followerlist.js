import React, { Component } from 'react'
import axios from 'axios'
import Displayusers from './Displayusers.js';
import HeaderNav from './Header.js';
const API_URL = 'http://127.0.0.1:4000'

export default class Followerlist extends Component {
  constructor(props){
    super(props);
    this.state = {
       usersInfo:"",
       isLoading:true,
    }
    this.sortingElement = this.sortingElement.bind(this);
  }
  componentDidMount() {
   var postData = {
          cursor:-1,
          screen_name: this.props.user.username,
          skip_status:'',
          include_user_entities:''
    };

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
         'Access-Control-Allow-Origin': '*',
      }
    };

    axios.get(API_URL+'/follow/users', postData, axiosConfig).then((res) => {   
           this.setState({usersInfo: res.data.users,isLoading:false},);
           console.log(res);
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });

  }
  
  sortingElement(e){
     const {
       usersInfo,
     } = this.state;
    
     let newuser = [...usersInfo];

     if(e.target.value === "1") {
         newuser.sort(function(a,b){
            if ( a.name < b.name ){
              return -1;
            }
            if ( a.name > b.name ){
              return 1;
            }
            return 0;
         });       

     } else if(e.target.value === "2") {
        newuser.sort(function(a,b){
            if ( a.name > b.name ){
              return -1;
            }
            if ( a.name < b.name ){
              return 1;
            }
            return 0;
         });
     }
     this.setState({
       usersInfo : newuser,
     });

 }

  displayInfo(){
    let items;
    const {
      usersInfo,
      isLoading
    } = this.state;

    if(isLoading){
     items= "Loading the users..."
    }else{
     items = usersInfo.map((val) =>
        <Displayusers user={val} /> 
      );
    }
     
    return items;
  }


  render() {
    return (
      <div className="container">
        <HeaderNav userinfo={this.props.user} />
        <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3 col-sm-12 offset-md-9 offset-sm-0">
              <div class="input-group mb-3 text-right">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">Sort by name :</label>
                </div>
                <select class="custom-select" id="inputGroupSelect01" onChange={this.sortingElement}>
                  <option value="0">Select</option>
                  <option value="1">A to Z</option>
                  <option value="2">Z to A</option>
                </select>
            </div>
          </div>
        </div>
        <div className="row grid-xl-wrap">             
           {this.displayInfo()}
        </div>
      </div>  
    )
  }
}