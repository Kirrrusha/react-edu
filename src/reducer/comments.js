import {normalizedComments} from '../fixtures';
import {ADD_COMMENT, LOAD_ARTICLE_COMMENTS, SUCCESS} from "../constants";
import {arrToMap} from "./utils";
import {OrderedMap, Record, Set} from "immutable";

const CommentRecord = Record({
    id: null,
    text: null,
    user: null
});

const ReducerRecord = Record({
    entities: new OrderedMap({}),
    loading: new Set(),
    loaded: new Set()
});

export default (state = arrToMap(normalizedComments), action) => {
    console.log(action);
    const {type, payload, randomId, response} = action;

    switch (type) {
        case ADD_COMMENT:
            return state.setIn(
                ['entities', randomId],
                new CommentRecord({
                    ...payload.comment,
                    id: randomId
                })
            );

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return state.mergeIn(['entities', arrToMap(response, CommentRecord)]);

        default:
            return state;
    }
};