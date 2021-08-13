import React, {Component } from 'react';
import LogIn from './login';
import SignUp  from './signup';


class LoginSignUp extends Component{
    state = {
        loginFlag: 1
    }
    
    toggleChild(){
        this.setState({
            loginFlag: !this.loginFlag
        })
    }


    render(){
        if(this.state.loginFlag === 1 ){
            return <LogIn toggleChild = {this.toggleChild}/>
        }
        else return <SignUp  toggleChild = {this.toggleChild}/>
    }
}

export default LoginSignUp;