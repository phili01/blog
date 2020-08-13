import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    posts: null,
    skipPost: null,
    ptTotal: null,
    showLoader: false
}

const fetchPost = (state, action) => {
    let posts = !state.posts ? action.posts : state.posts.concat(...action.posts);
    return updateObject(state, {posts, skipPost: action.skipPost, ptTotal: action.ptTotal, showLoader: false})
};

const fetchPostStart = (state, action) => {
    return updateObject(state, {showLoader: true})
};

const fetchPostReset = (state, action) => {
    return updateObject(state, {posts: null, skipPost: null, ptTotal: null, showLoader: false})
};

const fetchPostFail = (state, action) => {
    return updateObject(state, {postErr: action.err, showLoader: false})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_POST:
            return fetchPost(state, action);
        case actionTypes.FETCH_POST_START:
            return fetchPostStart(state, action);
        case actionTypes.FETCH_POST_RESET:
            return fetchPostReset(state, action);
        case actionTypes.FETCH_POST_FAIL:
            return fetchPostFail(state, action);
        default: return state
    }
};

export default reducer