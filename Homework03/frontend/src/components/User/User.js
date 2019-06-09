import React, { Component } from 'react';
import { ListGroupItem, Badge, Button, Collapse, Row, Col } from 'reactstrap';
import Post from "../Post/Post"

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    }
  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    const { name, id } = this.props.user;
    const posts = this.props.posts;
    return (
      <ListGroupItem className="justify-content-between" key={id}>
        <Row className="justify-content-between">
          <Col xs="auto">
            {name}
            <Badge pill style={{ marginLeft: '0.5rem' }}>{posts.length}</Badge>
          </Col>
          <Col xs="auto">
            <Button size="sm" color="primary" onClick={this.toggle} style={{ marginLeft: '1rem', right: 0 }}>
              {this.state.collapse ? "close" : "open"}
            </Button>
          </Col>
        </Row>
        <Collapse isOpen={this.state.collapse}>
          <hr />
          {posts.map((post, id) => (
            <Post data={post} key={id} />
          ))}
        </Collapse>
      </ListGroupItem>
    );
  }
}

export default User;
