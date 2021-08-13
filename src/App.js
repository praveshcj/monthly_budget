import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Expenses from './components/Expenses/Expenses';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginSignUp from './components/Login/loginsignup';
// import { AppContext } from './context/AppContext';
import { Redirect } from 'react-router';
import { Row, Col } from 'react-bootstrap';

class MoneyManager extends React.Component{
  state={
    isAuth: false, 
    username: ""
  }

	render(){
    if (this.state.isAuth){
      return (
      <Router>
          <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/expenses">Expenses</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
      <Switch>
        <Route path='/expenses' component={Expenses}/>
        <Route path='/login' component={LoginSignUp}/>
      </Switch>
    </Router>
    );
    }
    else{
      return(
        <Container > 
          <Row className=''>
            <Col></Col>
            <Col>
            <Router>
              <Redirect to='/login'/>
              <Switch>
                <Route path='/login' component={LoginSignUp}/>
              </Switch>
            </Router>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      );
    }
  }
}

export default MoneyManager;