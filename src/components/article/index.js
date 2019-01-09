import React, {Component} from 'react';
// import findDOMNode from 'react-dom';
import CSSTransition from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CommentList from '../comment-list';
import './style.css';
import {deleteArticle, loadArticleById} from '../../ac';
import Loader from "../common/loader";
import {articleSelector} from "../../selectors";

class Article extends Component {
    static propTypes = {
        article: PropTypes.shape({
            title: PropTypes.string.isRequired,
            text: PropTypes.string
        }),
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func,
        deleteArticle: PropTypes.func
    }

    state = {
        hasError: false
    }

    componentDidCatch(err) {
        console.log('---', err);
        this.setState({
            hasError: true
        })
    }

    render() {
        const {article, isOpen} = this.props;
        if (!article) return null;
        return (
            <div>
                <h3>{article.title}</h3>
                {/*<button onClick={this.handleClick}>{isOpen ? 'Close' : 'Open'}</button>*/}
                <button onClick={this.handleDelete}>delete me</button>
                <CSSTransition
                    transitionName="article"
                    transitionAppear
                    transitionEnterTimeout={500}
                    transitionAppearTimeout={1000}
                    transitionLeaveTimeout={300}
                >
                    {this.body}
                </CSSTransition>
            </div>
        )
    }

    handleClick = () => this.props.toggleOpen(this.props.article.id)

    handleDelete = () => {
        const {article, deleteArticle} = this.props;
        deleteArticle(article.id);
    };


    get body() {
        const {isOpen, article} = this.props;
        if (!isOpen) return null;
        if (this.state.hasError) return <div>Some Error in this article</div>;
        if (article.loading) return <Loader />;

        return (
            <section className="test__article--body">
                {article.text}
                <CommentList article={article}/>
            </section>
        )
    }

    componentDidMount() {
        const {article, id, loadArticleById} = this.props;
        if (!article || !article.text) loadArticleById(id);
    }

}

export default connect(
  (state, props) => ({
      article: articleSelector(state, props)
  }),
  {deleteArticle, loadArticleById})(Article);