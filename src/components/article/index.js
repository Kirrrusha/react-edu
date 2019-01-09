import React, {Component} from 'react';
// import findDOMNode from 'react-dom';
import CSSTransition from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import CommentList from './comment-list';

class Article extends Component {
    static propTypes = {
        article: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.string
        }).isRequired,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    state = {
        hasError: false
    }

    componentDidCatch(err) {
        console.log(err);
        this.setState({
            hasError: true
        })
    }

    componentWillReceiveProps(nextProps) {
        // console.log('updating', this.props.isOpen, nextProps.isOpen);
    }

    componentWillMount() {
        // console.log('mounting');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.isOpen !== this.props.isOpen;
    }

    render() {
        const {article, isOpen, toggleOpen} = this.props;
        console.log('update article');
        return (
            <div ref={this.setContainerRef}>
                <h3>{article.title}</h3>
                <button onClick={toggleOpen}>{isOpen ? 'Close' : 'Open'}</button>
                <CSSTransition
                    transitionName="article"
                    transitionEnterTimeout = {20000}
                    transitionLeaveTimeout = {20000}
                >
                    {this.getBody()}
                </CSSTransition>
            </div>
        )
    }

    setContainerRef = ref => {
        this.container = ref;
        // console.log(ref);
    }

    componentDidMount() {
        // console.log('mounted');
    }

    getBody() {
        const {article, isOpen} = this.props;
        if (!isOpen) return null;
        if (this.state.hasError) return <div>Some Error in this article</div>
        return (
            <section>
                {article.text}
                <CommentList comments={article.comments} ref={this.setCommentRef}/>
            </section>
        )
    }

    setCommentRef = ref => {
        // console.log(ref);
        // console.log(findDOMNode(ref));
    }
}

export default Article;