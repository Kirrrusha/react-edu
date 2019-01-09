import React, {Component} from 'react';
import Comment from '../comment/index';
import toggleOpen from '../../decorators/toggleOpen';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CommentForm from '../comment-form';
import Loader from "../common/loader";
import {connect} from "react-redux";
import {loadArticleComments} from "../../ac";


class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object,
        //from toggleOpen decorator
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    componentDidUpdate(oldProps) {
        const {isOpen, article, loadArticleComments} = this.props;
        if (
            isOpen &&
            !oldProps.isOpen &&
            !article.commentsLoading &&
            !article.commentsLoaded
        ) {
            loadArticleComments(article.id);
        }
    }

    getBody() {
        const {
            article: {comments, id, commentsLoading, commentsLoaded},
            isOpen
        } = this.props;
        if (!isOpen) return null;
        if (commentsLoading) return <Loader/>;
        if (!commentsLoaded) return null;


        return (
            <div className="test__comment-list--body">
                {comments.length ? (
                    this.comments
                ) : (
                    <h3 className="test__comment-list--empty">{('No comments yet')}</h3>
                )}
                <CommentForm articleId={id}/>
            </div>
        )
    }

    render() {
        const {isOpen, toggleOpen} = this.props;
        const text = isOpen ? 'hide comments' : 'show comments';
        return (
            <div>
                <button onClick={toggleOpen}>{text}</button>
                <ReactCSSTransitionGroup
                    transitionName="comments"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {this.getBody()}
                </ReactCSSTransitionGroup>
            </div>
        )
    }

    get comments() {
        return (
            <ul>
                {this.props.article.comments.map(id => (
                    <li key={id} className="test__comment-list--item">
                        <Comment id={id}/>
                    </li>
                ))}
            </ul>
        )
    }
}

export default connect(
    null,
    {loadArticleComments}
)(toggleOpen(CommentList));
