import {
    ADD_COMMENT,
    DELETE_ARTICLE,
    LOAD_ALL_ARTICLES,
    LOAD_ARTICLE,
    LOAD_ARTICLE_COMMENTS,
    START,
    SUCCESS
} from '../constants';
import {arrToMap} from "./utils";
import {Record} from 'immutable';

const ArticleRecord = Record({
    title: null,
    id: null,
    text: null,
    date: null,
    loading: false,
    commentsLoading: false,
    commentsLoaded: false,
    comments: []
});

const ReducerRecords = Record({
    entities: arrToMap([], ArticleRecord),
    loading: false,
    loaded: false,
    error: null
});

export default (articlesState = new ReducerRecords(), action) => {
    const {type, payload, randomId, response} = action;
    console.log(type);
    switch (type) {
        case DELETE_ARTICLE:
            return articlesState.deleteIn(['entities', payload.id]);

        case ADD_COMMENT:
            return articlesState.updateIn(['entities', payload.articleId, 'comments'], (comments) => comments.concat(randomId));


        case LOAD_ALL_ARTICLES + START:
            return articlesState.set('loading', true);

        case LOAD_ALL_ARTICLES + SUCCESS:
            return articlesState
                .update('entities',(entities) =>
                  arrToMap(response, ArticleRecord).merge(entities))
                .set('loading', false)
                .set('loaded', true);

        case LOAD_ARTICLE + START:
            return articlesState.setIn(['entities', payload.id, 'loading'], true);

        case LOAD_ARTICLE + SUCCESS:
            console.log(response);
            return articlesState.setIn(['entities', payload.id], new ArticleRecord(response));

        case LOAD_ARTICLE_COMMENTS + START:
            return articlesState.setIn(
                ['entities', payload.articleId, 'commentsLoading'],
                true
            );

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return articlesState
                .setIn(['entities', payload.articleId, 'commentsLoading'], false)
                .setIn(['entities', payload.articleId, 'commentsLoaded'], true)

        default:
            return articlesState;
    }
}
