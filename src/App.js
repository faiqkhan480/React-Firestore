import React, { Component } from 'react';
import fire from "./config/firebase";
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
// import PageNavbar from './components/PageNavbar';
import { AuthProvider } from "./routes/auth";
import ProtectedRoute from "./routes/protectedRoute";
import UnProtectedRoute from "./routes/unprotectedRoute"
import Home from './components/home';
import Profile from './components/profile';
import Login from "./components/login";
import Signup from "./components/signup";
import Footer from "./components/footer";
import Menu from "./components/nav";

class App extends Component{
    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            if(user) {
                console.log(user.uid, 'this user is signin')
            } else {
                console.log("user is not signin")
                this.setState({uid: null})
            }
        })
    }

    render() {
        return (
            <AuthProvider>
                <HashRouter basename='/'>
                    <Menu />
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <UnProtectedRoute exact path='/login' component={Login}/>
                        <Route exact path='/sign-up' component={Signup}/>
                        <ProtectedRoute exact path='/profile' component={Profile}/>
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        );
    }
}

export default App;