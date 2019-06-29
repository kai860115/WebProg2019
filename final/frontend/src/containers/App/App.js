import React, { Component } from 'react';
import './App.module.css';
import { BrowserRouter } from 'react-router-dom'
import { Link, Switch, Route } from 'react-router-dom'
import { ButtonGroup, Button, Container } from 'reactstrap';
import Auth from '../../components/Auth';
import NavbarPage from '../../components/NavbarPage'
import Home from '../Home'
import AllEvent from '../../components/AllEvent'
import MyEvent from '../../components/MyEvent'
import CreateByMe from '../../components/CreateByMe'
import { ME_QUERY } from '../../graphql'
import { Query } from 'react-apollo'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }



  render() {
    return (
      <BrowserRouter>
        <Query query={ME_QUERY}>
          {({ data, loading, error }) => {
            if (localStorage.getItem('token')) {
              if (error) {
                localStorage.removeItem('uid')
              }
            }
            return <NavbarPage />
          }}
        </Query>
        <Container style={{ height: "75%", marginTop: 50, overflow: "scroll", justifyContent: 'center' }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Auth} />
            <Route exact path="/allEvents" component={AllEvent} />
            <Route exact path="/myEvents" component={MyEvent} />
            <Route exact path="/createByMe" component={CreateByMe} />
          </Switch>
        </Container>
        <Container style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', marginTop: "2%" }}>
          <ButtonGroup>
            <Button outline color="success">
              <Link to="/allEvents">All Events</Link>
            </Button>
            <Button outline color="success">
              <Link to="/myEvents">My Events</Link>
            </Button>
            <Button outline color="success">
              <Link to="/createByMe">Create By Me</Link>
            </Button>
          </ButtonGroup>
        </Container>

      </BrowserRouter>
    );

  }
}

export default App;
