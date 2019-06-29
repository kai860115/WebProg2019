import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Alert } from 'reactstrap';
import { CREATEEVENT_MUTATION, MYEVENTS_QUERY, EVENTS_QUERY } from '../graphql'
import { Mutation } from 'react-apollo'

export default class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: "",
      descript: "",
      date: new Date()
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit = e => {
    e.preventDefault()

    const { title, descript, date } = this.state

    if (!title || !descript || !date) return

    this.createEvent({
      variables: {
        title: title,
        descript: descript,
        date: date
      }
    })

  }

  createEventComplete = (Cache, { data }) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      title: "",
      descript: "",
      date: new Date()
    }));
  }

  render() {
    return (
      <React.Fragment>
        <Button color="secondary" onClick={this.toggle}>Add Event</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Event</ModalHeader>
          <Mutation
            mutation={CREATEEVENT_MUTATION}
            update={this.createEventComplete}
            refetchQueries={[{ query: MYEVENTS_QUERY }, { query: EVENTS_QUERY }]}
          >
            {(mutation, { loading, error }) => {
              this.createEvent = mutation
              return (
                <React.Fragment>
                  <ModalBody>
                    <Label for="eventTitle">Title</Label>
                    <Input
                      type="title"
                      name="title"
                      id="eventTitle"
                      placeholder="with a placeholder"
                      onChange={e => this.setState({ title: e.target.value })}

                      value={this.state.title}
                    />
                    <br />
                    <Label for="eventDescription">Description</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="eventDescription"
                      onChange={e => this.setState({ descript: e.target.value })}

                      value={this.state.descript}
                    />
                    <br />
                    <Label for="eventDate">Date</Label>
                    <Input
                      type="date"
                      name="date"
                      id="eventDate"
                      placeholder="date placeholder"
                      onChange={e => {
                        this.setState({ date: e.target.value })
                      }}
                      value={this.state.date}
                    />
                    <br />
                    {error &&
                      <Alert color="danger">
                        {error.message}
                      </Alert>}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>Add</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </React.Fragment>

              )
            }}
          </Mutation>
        </Modal>
      </React.Fragment>
    );
  }
}