import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {articlesLoadingSelector, filtratedArticles} from '../selectors';
import {loadAllArticles} from "../ac";
import Loader from "./common/loader";
import NavLink from "react-router-dom/es/NavLink";

class ArticleList extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        openItemId: PropTypes.string,
        toggleOpenItem: PropTypes.func
    }

    render() {
        const {articles, loading} = this.props;
        if (loading) return <Loader />;
        const articleElements = articles.map(article => {
            return (
                <li key={article.id} className="test__article-list--item">
                    <NavLink to={`/articles/${article.id}`} activeStyle={{color: 'red'}}>{article.title}</NavLink>
                </li>
            )
        })

        return (
            <ul>
                {articleElements}
            </ul>
        )
    }

    componentDidMount() {
        const {fetchData} = this.props;
        fetchData && fetchData();
    }
}


export default connect((state) => {
    return ({
        articles: filtratedArticles(state),
        loading: articlesLoadingSelector(state)
    })
}, {fetchData: loadAllArticles})(ArticleList);
