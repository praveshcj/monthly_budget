import React, {Component } from 'react';
import LogIn from './login';
import SignUp  from './signup';


class LoginSignUp extends Component{
    state = {
        loginFlag: true
    }
    
    toggleChild = ( )=>{
        this.setState({
            loginFlag: !this.state.loginFlag
        })
    };


    render(){
        if(this.state.loginFlag === true ){
            return (
                    <LogIn toggleChild = {this.toggleChild}/>
                
            );
        }
        else return <SignUp toggleChild = {this.toggleChild}/>
    }
}

export default LoginSignUp;