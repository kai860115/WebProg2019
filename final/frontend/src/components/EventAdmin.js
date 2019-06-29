import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Col, Badge } from 'reactstrap';
import { Mutation } from 'react-apollo'
import { DELETEEVENT_MUTATION, EVENTS_QUERY, MYEVENTS_QUERY } from '../graphql'
import editEvent from './editEvent'

export default class Event extends Component {
  deleteEventComplete = (Cache, { data }) => {
    window.alert("Successful Delete!")
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
          <editEvent id={id} />
          <Mutation
            mutation={DELETEEVENT_MUTATION}
            refetchQueries={[{ query: MYEVENTS_QUERY }, { query: EVENTS_QUERY }]}
            update={this.deleteEventComplete}
          >
            {(mutation, { loading, error }) => {
              this.deleteEventMutation = mutation
              if (error) {
                window.alert(error.message)
              }
              return (
                <Button
                  color="danger"
                  style={{ marginTop: 10 }}
                  onClick={
                    (e) => {
                      this.deleteEventMutation({
                        variables: {
                          id: id
                        }
                      })
                    }
                  }
                >
                  Delete
                </Button>
              )
            }}
          </Mutation>
        </Card>
      </Col>
    )
  }
}