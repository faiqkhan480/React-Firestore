import React, { Component } from 'react';
import fire from "./config/firebase";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
// import PageNavbar from './components/PageNavbar';
import Profile from './components/profile';
import Login from "./components/login";
import Signup from "./components/signup";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
        }
    }
    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            if(user) {
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                console.log(displayName, uid, 'this user is signin')
                this.setState({uid: user.uid})
            } else {
                console.log("user is not signin")
                this.setState({uid: null})
            }
        })
    }

    render() {
        const { uid } = this.state
        return (
         <Router>
             <Switch>
                 <Route exact path='/login' component={Login}/>
                 <Route path='/sign-up' component={Signup}/>
                 <Route path='/profile' component={Profile}/>
             </Switch>
         </Router>
        );
    }
}

export default App;

// <div className="App">
//     {uid ? <Profile/> : <Login/>}
// </div>