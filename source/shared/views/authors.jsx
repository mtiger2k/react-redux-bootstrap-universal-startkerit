'use strict';
import React from 'react'
import { Row, Col } from 'react-bootstrap';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag' // NOTE: lets us define GraphQL queries in a template language
import AuthorForm from './authorForm'

export class Author extends React.Component {

    handleCreate = (data) => {
        console.log(data);
        this.props.createAuthor(data);
    }

    render() {
        let authors = this.props.data.authors;
        let authorsDiv = null;
        if (!authors) {
            authorsDiv = ( < h1 > Loading authors < / h1 > );
        } else {
            authorsDiv = (
                <div>
                {authors.map((author, idx) => (
                <div key={'author-'+idx}>
                <h1>{author.firstName}'s posts</h1>
                    {author.posts && author.posts.map((post, idx) => (
                        <li key={idx}>{post.title}</li>
                    ))}
                </div>
                ))}
                </div>
            );
        }

        return (
            <Row>
            <Col md={6}>
                <AuthorForm onSubmit = {this.handleCreate} />
                {authorsDiv}
            </Col>
            </Row>
            )
    }
}

const GET_AUTHER = gql`
    query authors {
        authors {
            firstName
            posts {
                title
            }
        }
    }
`;

const CREATE_AUTHOR = gql`
  mutation createAuthor($firstName: String!, $lastName: String!) {
    createAuthor(firstName: $firstName, lastName: $lastName) {
      firstName
      lastName
    }
  }
`;

const withCreateAuthor = graphql(CREATE_AUTHOR, {
  props: ({ ownProps, mutate }) => ({
    createAuthor(author) {
      return mutate({
        variables: { firstName: author.firstName, lastName: author.lastName },
        updateQueries: {
          authors: (previousQueryResult, { mutationResult, queryVariables }) => {
            // otherwise, create a new object with the same shape as the
            // previous result with the mutationResult incorporated
            const originalList  = previousQueryResult.authors;
            const newAuthor = mutationResult.data.createAuthor;
            newAuthor.posts = [];
            originalList.push(newAuthor);
            console.log('new author: '+newAuthor);
            return {
              authors: [
                ...originalList
              ]
            };
          },
        },
        optimisticResponse: {
            createAuthor: {...author, __typename: "Author"}
        }
      // Depending on what you do it may make sense to deal with
      // the promise result in the container or the presentational component
      }).then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
    },
  })
});

const AuthorComopnent = withCreateAuthor(Author);

export default graphql(GET_AUTHER)(AuthorComopnent)
