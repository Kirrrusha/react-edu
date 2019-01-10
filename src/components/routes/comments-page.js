import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from "react-router-dom";
import CommentsPagination from '../comments-paginator';

function CommentsPage({match}) {
  return match.isExact ?
    <Redirect to="/comments/1" />
  : <Route path="/comments/:page" render={getCommentsPaginator} />
}

function getCommentsPaginator({ match }) {
  return <CommentsPagination page={match.params.page} />
}

CommentsPage.propTypes = {}

export default CommentsPage
