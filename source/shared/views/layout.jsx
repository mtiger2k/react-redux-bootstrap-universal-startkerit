import React from 'react'
import { Grid } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Breadcrumbs from 'react-breadcrumbs';
import Settings from '../settings';
import NavBar from './navbar';

export default class Layout extends React.Component {
  render() {
    return (
      <Grid>
        <NavBar />
      <Breadcrumbs {...this.props} setDocumentTitle={true} />
      {this.props.children}
      <footer>
        Server-rendered Shared App
      </footer>
    </Grid>
    )
  }
}


