import React from 'react'

import { Card, CardHeader, CardFooter, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap'

const Post = ({
  data: {
    title,
    body,
    author: { name },
    comments
  }
}) => {
  return (
    <Card style={{ margin: '30px auto' }} >
      <CardHeader tag="h4">
        {title}
      </CardHeader>
      <CardBody>
        {body || <CardText style={{ opacity: 0.5 }}>No body for this post...</CardText>}
      </CardBody>
      <CardFooter>
        <ListGroup flush>
          {
            comments.length !== 0 ?
              comments.map((e, id) => {
                return (
                  <ListGroupItem key={id} style={{ "padding": "10 10" }}>
                    <strong>{e.author.name}</strong>&nbsp;&nbsp;&nbsp;{e.text}
                  </ListGroupItem>)
              }) : <ListGroupItem>no comments</ListGroupItem>
          }
        </ListGroup>
      </CardFooter>
    </Card>
  )
}

export default Post
