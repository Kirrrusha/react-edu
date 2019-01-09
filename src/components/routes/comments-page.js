import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route} from "react-router-dom";

function CommentsPage() {
  return <Route path="/comments/:page" render={getCommentsPaginator}/>
}

function getCommentsPaginator({match}) {
  return <CommentsPaginator page={match.params.page}/>
}

CommentsPage.propTypes = {};

export default CommentsPage;
