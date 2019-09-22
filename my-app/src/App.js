import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
 login = () => { console.log("Button clicked");}
  render(){
    return (
      <div className="App">
         <button onClick={this.login}> Twitter Login</button>
      </div>
    );
  }
}

export default App;
