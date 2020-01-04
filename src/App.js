import React, { Component } from 'react';
import fire from "./config/firebase";
import { BrowserRouter as Router, HashRouter, Switch, Route } from 'react-router-dom';
import './App.css';
// import PageNavbar from './components/PageNavbar';
import AuthProvider from "./routes/auth";
import ProtectedRoute from "./routes/protectedRoute";
import UnProtectedRoute from "./routes/unprotectedRoute"
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
                console.log(user.uid, 'this user is signin')
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
            <AuthProvider>
                <HashRouter basename='/'>
                    <Switch>
                        <UnProtectedRoute exact path='/' component={Login}/>
                        <Route path='/sign-up' component={Signup}/>
                        <ProtectedRoute path='/profile' component={Profile}/>
                    </Switch>
                </HashRouter>
            </AuthProvider>
        );
    }
}

export default App;

// <div className="App">
//     {uid ? <Profile/> : <Login/>}
// </div>