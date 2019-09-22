import React, { Component } from 'react'

export default class Displayusers extends Component {
  render() {
    const {
      profile_image_url,
      name,
      screen_name
    } = this.props.user;

    let profile_image_org = profile_image_url.replace("_normal","");
    return (
              <div className="col-md-3 col-lg-3 col-xl-3 col-s-3" key={name}>
                  <div className="card">
                    <img className="card-img-top" src={profile_image_org} alt={name} />
                    <div className="card-body">
                      <p className="card-text">{name}</p>
                      <p className="card-text">@{screen_name} </p>
                    </div>
                  </div>                 
              </div>
 
    )
  }
}