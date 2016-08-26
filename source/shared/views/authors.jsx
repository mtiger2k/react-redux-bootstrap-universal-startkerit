'use strict';
import React from 'react'
import { Row, Col } from 'react-bootstrap';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag' // NOTE: lets us define GraphQL queries in a template language

export class Author extends React.Component {

    render() {
        let authors = this.props.data.authors;
        let authorsDiv = null;
        if (!authors) {
            authorsDiv = ( < h1 > Loading
            authors < / h1 >
        );
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
                {authorsDiv}
            </Col>
            </Row>
            )
    }
}

const GET_AUTHER = gql`
    query {
        authors {
            firstName
            posts {
                title
            }
        }
    }
`;

export default graphql(GET_AUTHER)(Author)


