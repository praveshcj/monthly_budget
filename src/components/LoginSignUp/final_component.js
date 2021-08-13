import React, {Component } from 'react';
import LogIn from './login';
import SignUp  from './signup';
class LoginSignUp extends Component{
    state = {
        loginFlag: 1
    }
    render(){
        if(this.state.loginFlag === 1 ){
            return <LogIn></LogIn>
        }
        else return <SignUp></SignUp>
    }
}

export default LoginSignUp;