import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation (
    $email: String!
    $password: String!
    $username: String!
    $affiliation: String!
    $firstName: String!
    $lastName: String!
    $moderatorLevel: Int!
  ) {
    createUser(
      email: $email
      password: $password
      username: $username
      affiliation: $affiliation
      firstName: $firstName
      lastName: $lastName
      moderatorLevel: $moderatorLevel
    ) {
      id
      username
      moderatorLevel
      posts {
        id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
    }
  }
`;

export const CREATE_POST = gql`
  mutation ($postImage: String!, $title: String!, $content: String!) {
    createPost(postImage: $postImage, title: $title, content: $content) {
      id
      userId
      flagged
      comments {
        id
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation ($content: String!, $postId: String!) {
    createComment(content: $content, postId: $postId) {
      id
      content
      userId
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation ($commentId: ID!) {
    deleteComment(commentId: $commentId)
  }
`;

export const FLAG_COMMENT = gql`
  mutation ($commentId: ID!) {
    flagComment(commentId: $commentId) {
      id
      content
      flagged
      postId
      userId
    }
  }
`;

export const DELETE_FLAG_COMMENT = gql`
  mutation ($commentId: ID!) {
    deleteFlaggedComment(commentId: $commentId)
  }
`;