import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Col, Badge } from 'reactstrap';
import { Mutation } from 'react-apollo'
import { JOINEVENT_MUTATION, LEAVEEVENT_MUTATION, EVENTS_QUERY, MYEVENTS_QUERY } from '../graphql'

export default class Event extends Component {
  joinValidator = () => {
    if (localStorage.getItem('uid')) {
      return this.props.event.members.some(e => e.id === localStorage.getItem('uid'))
    }
    return false
  }

  leaveValidator = () => {
    if (localStorage.getItem('uid')) {
      return !(this.props.event.members.some(e => e.id === localStorage.getItem('uid')))
    }
    return false
  }


  render() {
    const { id, title, descript, members, createBy, date } = this.props.event
    return (
      <Col sm="4" style={{ width: 300, marginTop: 10 }}>
        <Card body outline color="primary">
          <CardTitle ><h4>{title}</h4><Badge color="secondary">{members.length} people join </Badge></CardTitle>
          <CardText>description: {descript}</CardText>
          <CardText>date:  {date.substring(0, 10)}</CardText>
          <CardText>create by: {createBy.username}</CardText>
          <Mutation
            mutation={JOINEVENT_MUTATION}
            refetchQueries={[{ query: MYEVENTS_QUERY }, { query: EVENTS_QUERY }]}
          >
            {(mutation, { loading, error }) => {
              this.joinEventMutation = mutation
              if (error) {
                window.alert(error.message)
              }
              return (
                <Button
                  color="success"
                  style={{ marginTop: 10 }}
                  disabled={this.joinValidator()}
                  onClick={
                    (e) => {
                      this.joinEventMutation({
                        variables: {
                          id: id
                        }
                      })
                    }
                  }
                >
                  Join
                </Button>
              )
            }}
          </Mutation>
          <Mutation
            mutation={LEAVEEVENT_MUTATION}
            refetchQueries={[{ query: MYEVENTS_QUERY }, { query: EVENTS_QUERY }]}
          >
            {(mutation, { loading, error }) => {
              this.leaveEventMutation = mutation
              if (error) {
                window.alert(error.message)
              }
              return (
                <Button
                  color="danger"
                  style={{ marginTop: 10 }}
                  disabled={this.leaveValidator()}
                  onClick={
                    (e) => {
                      this.leaveEventMutation({
                        variables: {
                          id: id
                        }
                      })
                    }
                  }
                >
                  Leave
                </Button>
              )
            }}
          </Mutation>
        </Card>
      </Col>
    )
  }
}