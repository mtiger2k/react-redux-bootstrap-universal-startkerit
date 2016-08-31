import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import PageWrapper from '../../../lib/page/PageWrapper';
import PageHeader from '../../../lib/page/PageHeader';
import Breadcrumb from '../../../lib/page/Breadcrumb';
import PageContent from '../../../lib/page/PageContent';
import Box from '../../../lib/widgets/Box';

import { fetchNews } from '../../../actions/news';

class Posts extends Component {
  render() {
    function createmarkup(html) { return {__html: html}; };
    return (
      <ul>
        {this.props.posts.map((post, i) =>
        <li key={i}>
          <a onClick={this.props.onClickHandler.bind(this,i)}>{post.title}</a>
           {this.props.activePost===i ?
             <div style={{marginBottom: 15}}
               dangerouslySetInnerHTML= {createmarkup(post.body)} />:
             <div/>
             }
         </li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  activePost: PropTypes.number.isRequired
}

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
      <PageWrapper>
      <PageHeader
        title="News page"
        description="Welcome to news page"
      >
        <Breadcrumb
          items={[
            { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
            { key: 2, title: 'News' },
          ]}
        />
      </PageHeader>
      <PageContent>
        <Box
          title="News"
          status="primary"
         >
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
          </Box>
      </PageContent>
    </PageWrapper>
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