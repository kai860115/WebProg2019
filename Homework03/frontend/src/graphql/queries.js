import { gql } from 'apollo-boost'

export const POSTS_QUERY = gql`
  query {
    posts {
      title
      body
      author {
        name
      }
      comments{
        author{
          name
        }
        text
      }
    }
    users {
      id
      name
    }
  }
`

export const USERS_QUERY = gql`
  query {
    users {
      id
      name
    }
  }
`
