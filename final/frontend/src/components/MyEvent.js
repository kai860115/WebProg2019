import React, { Component } from 'react'
import { Container, Row } from 'reactstrap';
import { Query } from 'react-apollo'
import { MYEVENTS_QUERY } from '../graphql'
import Event from './Event'

export default class MyEvent extends Component {
  render() {
    if (!localStorage.getItem('token')) {
      return (
        <Container style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
          <Row>
            <h4>Please Login First</h4>
          </Row>
        </Container>
      )
    }
    return (
      <Query query={MYEVENTS_QUERY} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (error) return <p>{error.message}</p>
          if (loading) return <p>Loading...</p>
          if (data.myEvents) {
            return (
              <Container >
                <Row style={{ flexWrap: "wrap" }}>
                  {
                    data.myEvents.map(event => {
                      return (<Event key={event.id} event={event} />)
                    })
                  }
                </Row>
              </Container>
            )
          }
          return <p>Internet Error...</p>
        }}
      </Query>
    )
  }
}