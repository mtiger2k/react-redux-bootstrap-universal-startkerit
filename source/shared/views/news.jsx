'use strict';

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Posts from './posts';
import { fetchNews } from '../actions/news';

class News extends Component {
  constructor(props) {
    super(props)
    this.state={};
    this.state._activePost=-1;
  }

  componentDidMount() {
    const { fetchNews, dispatch } = this.props
    dispatch(fetchNews())
  }

  handleClickCallback(i){
    this.setState({_activePost:i});
  }

  render() {
    const { posts, isFetching, lastUpdated } = this.props.receivePosts
    const { _activePost } = this.state;
    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated)
                .toLocaleTimeString()}.
            </span>
          }
        </p>
        {posts && isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {posts && !isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts && posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} activePost={_activePost} 
              onClickHandler={this.handleClickCallback.bind(this)} />
          </div>
        }
      </div>
    )
  }
}

News.propTypes = {
  receivePosts: React.PropTypes.shape({
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number
  }),
  dispatch: PropTypes.func.isRequired,
  fetchNews: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    receivePosts: {
      posts: ('posts' in state.news) ?  state.news.posts : [],
      isFetching: ('isFetching' in state.news) ? state.news.isFetching : true,
      lastUpdated: ('lastUpdated' in state.news) ? state.news.lastUpdated : null
    }
  }

}

function mapDispatchToProps(dispatch) {
  return { fetchNews, dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)

