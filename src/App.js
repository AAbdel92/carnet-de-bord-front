import React, { Component } from 'react';
import './App.css';
import MySite from "./MySite/MySite.js";
import "semantic-ui-css/semantic.min.css";

class App extends Component {

  constructor(props) {
        super(props);
        this.state = {     
            loggedIn : false,
            user : {
                lastname : "",
                firstname : "",
                role : {
                  id : 0,
                  name : ""
                },
                promo : {
                  id : 0,
                  name : ""
                }
             }
          }
     }

     componentDidMount() {
       console.log("App did mount")
       this.checkSessionStorage();
     }

     componentDidUpdate(prevProps, prevState) {
        console.log("App did update")
        sessionStorage.setItem('state', JSON.stringify(this.state));
}

     checkSessionStorage = () => {
       try {
         if (sessionStorage.getItem('state') !== null) {
         this.setState((prevState) => {
          return prevState = JSON.parse(sessionStorage.getItem('state'))
        });
         }
       } catch (err) {
          console.log(err);
         }         
       }     

     getUser = (boolean, newUser) => {  
  this.setState({
    loggedIn : boolean,
    user : newUser
  })  
}

deleteUser = () => {
  this.setState({
    loggedIn : false,
    user : {
                lastname : "",
                firstname : "",
                role : {
                  id : 0,
                  name : ""
                },
                promo : {
                  id : 0,
                  name : ""
                }
             }
  })
}

getPromoId = () => {       
        if (this.state.user.promo !== undefined) {
                return this.state.user.promo.id
            } else {
                return this.state.user.pair.promo.id
            }
    }

getStudentId = () => {        
    if (this.state.user.pair !== undefined) {
            return this.state.user.pair.id
        } else {
            return this.state.user.id
        }
}

  render() {
    console.log("App render")   
    return (      
        <MySite
          user={this.state.user}
          loggedIn={this.state.loggedIn}
          getUser={this.getUser}
          deleteUser={this.deleteUser}
          promoId={this.getPromoId}
          studentId={this.getStudentId}
        />
    );
  }
}

export default App;
