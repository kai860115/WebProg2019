import React, { Component } from 'react'
import { Container, Row } from 'reactstrap';
import { Query } from 'react-apollo'
import { EVENTS_QUERY } from '../graphql'
import Event from './Event'

export default class AllEvent extends Component {
  render() {
    return (
      <Query query={EVENTS_QUERY} fetchPolicy="network-only">
        {({ loading, data, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error...</p>
          return (
            <Container >
              <Row style={{ flexWrap: "wrap" }}>
                {
                  data.events.map(event => {
                    return (<Event key={event.id} event={event} />)
                  })
                }
              </Row>
            </Container>
          )
        }}
      </Query>
    )
  }
}