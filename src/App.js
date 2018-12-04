import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom'
import SignInContainer from './components/SignInContainer'
import Home from './components/Home'
import './App.css';
import { Provider } from 'react-redux';
import store from './store'
import { BrowserRouter, Redirect } from 'react-router-dom'



class App extends Component {
    render() {

        if (window.document.cookie.indexOf("login=true") === -1 && window.location.pathname !== '/signin') {
            //Sign In Cookie is not set, redirect to Homepage
            return <Redirect push to='/signin' />
        }
        return (
            
            <Switch>
                <Route exact path='/home' component={Home}/>
                <Route exact path='/signin' component={SignInContainer} />
            </Switch>
        )
        
    }
}

function baseComponent() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    )
}


export default baseComponent