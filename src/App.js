import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Expenses from './components/Expenses/Expenses';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import LoginSignUp from './components/Login/loginsignup';
import Dashboard from './components/Dashboard/Dashboard';
import { AppContext } from './context/AppContext';
import { Redirect } from 'react-router';
import { Row, Col } from 'react-bootstrap';

class MoneyManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isAuth: false,
    };
    this.checkTokenAndRedirect = this.checkTokenAndRedirect.bind(this);
  }

  checkTokenAndRedirect() {

    const key = localStorage.getItem("key");
    if (key) {
      const payLoad = {
        'token': key
      }
      fetch("/getUserInfo", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payLoad)
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            isAuth: true,
            username: '',
            isLoading: false,
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        isLoading: false,
        isAuth: false,
      });
    }
  }

  componentDidMount() {
    this.checkTokenAndRedirect();
  }

  render() {
    if (this.state.isLoading) {
      return (<p>Wait</p>)
    } else {
      if (this.state.isAuth) {
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
              <Route exact path='/expenses' component={Expenses} />
              <Route exact path='/' component={Dashboard} />
            </Switch>
          </Router>
        );
      } else {
        return (
          <Container>
            <Row>
              <Col></Col>
              <Col>
                <Router>
                  <Redirect to='/login' />
                  <Switch>
                    <Route exact path='/login' render={() => <LoginSignUp checkTokenAndRedirect={this.checkTokenAndRedirect} />} />
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
}

MoneyManager.contextType = AppContext;
export default MoneyManager;