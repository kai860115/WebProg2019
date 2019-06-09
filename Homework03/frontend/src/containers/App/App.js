import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ListGroup
} from 'reactstrap'

import {
  POSTS_QUERY,
  USERS_QUERY,
  CREATE_POST_MUTATION,
  POSTS_SUBSCRIPTION
} from '../../graphql'
import User from '../../components/User/User'
import classes from './App.module.css'

let unsubscribe = null

class App extends Component {
  state = {
    formAuthorId: '1',
    formTitle: '',
    formBody: ''
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const { formTitle, formBody, formAuthorId } = this.state

    if (!formTitle || !formBody) return

    this.createPost({
      variables: {
        title: formTitle,
        body: formBody,
        published: true,
        authorId: formAuthorId
      }
    })

    this.setState({
      formAuthorId: '1',
      formTitle: '',
      formBody: ''
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className={classes.title}>Modern GraphQL Tutorial</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6" className={classes.form}>
            <Mutation mutation={CREATE_POST_MUTATION}>
              {createPost => {
                this.createPost = createPost

                return (
                  <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup row>
                      <Label for="author" sm={2}>Author</Label>
                      <Col sm={10}>
                        <Query query={USERS_QUERY}>
                          {({ loading, error, data, subscribeToMore }) => {
                            if (loading) return <p>Loading...</p>
                            if (error) return <p>Error :(((</p>

                            const options = data.users.map((user, id) => (
                              <option value={user.id} key={id}>{user.name}</option>
                            ))
                            return (<Input type="select" name="select" id="author" onChange={e => this.setState({ formAuthorId: e.target.value })}>
                              {options}
                            </Input>)
                          }}
                        </Query>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="title" sm={2}>
                        Title
                      </Label>
                      <Col sm={10}>
                        <Input
                          name="title"
                          value={this.state.formTitle}
                          id="title"
                          placeholder="Post title..."
                          onChange={e =>
                            this.setState({ formTitle: e.target.value })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label for="body">Body</Label>
                      <Input
                        type="textarea"
                        name="body"
                        value={this.state.formBody}
                        id="body"
                        placeholder="Post body..."
                        onChange={e =>
                          this.setState({ formBody: e.target.value })
                        }
                      />
                    </FormGroup>
                    <Button type="submit" color="primary">
                      Post!
                    </Button>
                  </Form>
                )
              }}
            </Mutation>
          </Col>
          <Col xs="6">
            <Query query={POSTS_QUERY} >
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(((</p>


                if (!unsubscribe)
                  unsubscribe = subscribeToMore({
                    document: POSTS_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev
                      const newPost = subscriptionData.data.post.data

                      return {
                        ...prev,
                        posts: [newPost, ...prev.posts]
                      }
                    }
                  })

                const users = data.users.map((user, id) => {
                  const posts = data.posts.filter(post => {
                    return post.author.name === user.name
                  })
                  return (
                    <User user={user} posts={posts} key={id} />
                  )
                })
                return <ListGroup flush style={{ margin: "40px auto" }}>{users}</ListGroup>
              }}
            </Query>
          </Col>
        </Row>
      </Container >
    )
  }
}

export default App
