import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
export default class SignUp extends Component {

    // var url = "";
    // url = "http://localhost:5000";

    submitUserDetails = (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        var formDataObj = Object.fromEntries(formData.entries());
        const payLoad ={
            'first_name': formDataObj.first_name,
            'last_name' : formDataObj.last_name,
            'dob':formDataObj.dob,
            'email': formDataObj.email,
            'password': formDataObj.password
        }
        // var data = new FormData();
        // data.append("data_json", JSON.stringify(formDataObj));
        fetch("/postUserData",{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payLoad)
        } )
    }
    componentDidMount() {
        // Simple GET request using fetch
        fetch('/expense_backend')
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.submitUserDetails}>
                    <Row>
                    <Col>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name='first_name' placeholder="First Name" />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name='last_name' placeholder="First Name" />
                    </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter Email" />
                    </Form.Group>
                    </Row>
                    <Row>
                    <Form.Group className="mb-3" controlId="dob" >
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" name="dob" placeholder="Enter Date of Birth"/>
                    </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" />
                    </Form.Group>
                    <Row>
                    <Col>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                    </Col>
                    <Col></Col>
                    <Col>
                    <Button variant="secondary" onClick={this.props.toggleChild}>
                        Log In
                    </Button>
                    </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}