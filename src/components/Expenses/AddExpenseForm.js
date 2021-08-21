import React, { useContext, useState } from 'react';
import { AppProvider, AppContext } from './../../context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import {Form, Container, InputGroup, Row, Col, Button, Dropdown, DropdownButton} from 'react-bootstrap';
import { Component } from 'react';

class AddExpenseForm extends Component{
	addExpense = (event) => {
		event.preventDefault();
		console.log(event.target);
	};

	render(){
		return (
		<Container>
            <Form onSubmit={this.addExpense}>
				<Row>
				<Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Select>
						<option>Choose Expense Type</option>
						<option value="Food">Food</option>
						<option value="Investment">Investment</option>
						<option value="Personal">Personal</option>
						<option value="Travelling">Travelling</option>
						<option value="Accessories">Accessories</option>
						<option value="Others">Others</option>
					</Form.Select>
                </Form.Group>
				</Col>
				<Col>
				<Form.Group className="mb-3">
					<Row>
						<Col>
						<Form.Select>
							<option>Currency</option>
							<option value="INR">INR</option>
							<option value="USD">USD</option>
						</Form.Select>
						</Col>
						<Col>
							<Form.Control type="number" name="expense_amount" placeholder="Expense Amount"/>
						</Col>
					</Row>
				</ Form.Group>
				</Col>
				</Row>
                <Row>
                <Col>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Col>
                <Col></Col>
                </Row>
            </Form>
            </Container>
		);
	}
};

export default AddExpenseForm;