import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Expenses from './components/Expenses/Expenses';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {
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
    </Switch>
  </Router>
	);
};

export default App;