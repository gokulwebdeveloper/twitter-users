import React, { Component } from 'react'
import io from 'socket.io-client'
import Followerlist from './Followerlist.js';
import 'bootstrap/dist/css/bootstrap.min.css';
const API_URL = 'http://127.0.0.1:4000'
const socket = io(API_URL)

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      user: {},
      disabled: ''
    }
    this.popup = null  
  }

  componentDidMount() {
    socket.on('user', user => {
      this.popup.close()
      this.setState({user})
    })
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: ''})
      }
    }, 1000)
  }

  openPopup() {
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    
    const url = `${API_URL}/twitter?socketId=${socket.id}`

    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  startAuth() {

    if (!this.state.disabled) {  
      this.popup = this.openPopup()  
      this.checkPopup()
      this.setState({disabled: 'disabled'})
    }
  }

  closeCard() {
    this.setState({user: {}})
  }

  render() {
    const {name}=this.state.user;
    const { disabled } = this.state;
    return (
      <>
        {name
          ? <div className="container-fluid">              
            <Followerlist user={this.state.user} />
            </div>
          : <div className={`twitter ${disabled}`}>
              <div className="login-form">
                  <h2 className="text-center">Please Log in with Twitter</h2>   
                   <div className="form-group">
                        <button type="button" onClick={this.startAuth.bind(this)} className="btn btn-primary btn-block">Login with twitter</button>
                   </div>
				    </div>
	        </div>
        }
      </>
    )
  }
}