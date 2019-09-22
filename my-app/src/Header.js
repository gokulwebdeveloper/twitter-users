import React, { Component } from 'react'

export default class HeaderNav extends Component {
  render(){
  	const {
  	  userinfo
  	} = this.props;

  	const{
  		photo,
  		name
  	} = userinfo;

	return(
	 	<div>
			<nav className="navbar navbar-expand-sm">
				<div className="container">				
				  <div className="row">
				        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
				        	<h1>Twitter Followers</h1>
				        </div>
					    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
					    	<img src={photo} alt={name} className="profileName" />
					    	<span>Welcome {name}</span>
					    	<a href="/">Logout</a>
			            </div>
				    </div>   
				</div>   
			</nav>
	 	</div>
	)
  }
}  