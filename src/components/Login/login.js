import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default class Login extends Component {
    loginSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        var formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj);
        const payLoad ={
            'email': formDataObj.email,
            'password': formDataObj.password
        }
        var valid = false;
        fetch("/loginuser",{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payLoad)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.res == "Valid"){
                localStorage.setItem('key', data.token);
                
            }
        })
    }

    componentDidMount=() => {
        console.log(this.props);
    };

    render() {
        return (
            <Container >
            <Form onSubmit={this.loginSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Row>
                <Col>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Col>
                <Col></Col>
                <Col>
                <Button variant="secondary" onClick={this.props.toggleChild}>
                    Sign Up
                </Button>
                </Col>
                </Row>
            </Form>
            </Container>
        );
    }
}