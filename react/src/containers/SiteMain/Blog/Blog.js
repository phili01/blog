import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlogContent from '../../../components/Main/BlogContents/BlogContents';
import * as actions from '../../../store/actions/index';

class Blog extends Component {
    state = {
        fetchLimit: 5,
        filterTag: 'post',
    }
    componentDidMount() {
        this.props.onFetchPost(null, this.state.filterTag, this.state.fetchLimit, 0, 0);
    }

    componentDidUpdate() {
        if (this.props.match.params.id && this.props.match.params.id !== this.state.filterTag) {
            this.props.onFetchPostReset();
            let cnt = this.props.match.params.id;
            this.props.onFetchPost(null, cnt, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: cnt
            });
        }
    }

    nextHandler = (i) => {
        this.props.onFetchPostReset()
        this.props.onFetchPost(null, this.state.filterTag, this.state.fetchLimit, i === 1 ? 0: this.state.fetchLimit * (i - 1), 0);
    }

    render() {
        let cnt = "Loading ...."
        if (this.props.postErr) {
            cnt = "Network Error"
        }
        if (this.props.posts && this.props.posts.length === 0) {
           cnt = "No content found"
        }

        if (this.props.posts && this.props.posts.length > 0 && !this.props.postErr) {
            cnt= (
                <BlogContent 
                    content={this.props.posts}/>
            )
        }
        let page = [];
        
        for (let i = 1; i <= Math.ceil(this.props.ptTotal / this.state.fetchLimit); i++) {
            page.push (
                <li key={i} onClick={this.nextHandler.bind(this, i)} className="site-main__blog--paginate__item site-main__blog--paginate__item--active">{i}</li>
            )
        }
        return (
            <>
                {cnt}
                <ul className="site-main__blog--paginate">
                    { page }
                </ul>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.pt.posts,
        skipPost: state.pt.skipPost,
        ptTotal: state.pt.ptTotal,
        postErr: state.pt.postErr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPost: (userID, fetchType, limit, skipPost, ptTotal) => dispatch(actions.fetchPostInit(userID, fetchType, limit, skipPost, ptTotal)),
        onFetchPostReset: () => dispatch(actions.fetchPostReset())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));