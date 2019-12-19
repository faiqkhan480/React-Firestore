import React, { Component } from 'react';
import fire from "./config/firebase";
import './App.css';
// import PageNavbar from './components/PageNavbar';
import Profile from './components/profile';
import Login from "./components/login";
// import Signup from "./components/signup";

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
                console.log(user, 'this user is signin')
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
            <div className="App">
                {uid ? <Profile/> : <Login/>}
            </div>
        );
    }
}

export default App;
