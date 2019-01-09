import React, {Component} from 'react';
import ArticleList from '../article-list';
import Article from '../article';
import {Route} from "react-router-dom";

class ArticlesPage extends Component {
  render() {
    return (
      <div>
        <ArticleList/>
        <Route path="/articles/:id" children={this.getArticle} exact/>
      </div>
    );
  }

  getArticle = ({match}) => {
    console.log('article match:' + match);
    if (!match) return <h1>Select an Article</h1>
    return (
      <Article id={match.params.id} isOpen key={match.params.id}/>
    )
  }
}

export default ArticlesPage;
