import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {createCommentSelector} from "../../selectors";


function Comment({comment}) {
    return (
        <div>
            <div>{comment.text}</div>
            <div><b>by {comment.user}</b></div>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.shape({
        text: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
    }).isRequired
};

const createMapStateToProps = () => {
    const   commentSelector = createCommentSelector();

    return (state, ownProps) => ({
        comment: commentSelector(state, ownProps)
    })
};

export default connect(createMapStateToProps)(Comment);