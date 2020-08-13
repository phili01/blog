import * as actionTypes from './actionTypes';

export const fetchPostInit = (userID, fetchType, fetchLimit, skipPost, ptTotal) => {
    return {
        type: actionTypes.FETCH_POST_INIT,
        userID,
        fetchType,
        fetchLimit,
        skipPost,
        ptTotal
    }
};

export const fetchPostStart = () =>{
    return {
        type: actionTypes.FETCH_POST_START
    };
}

export const fetchPostReset = () =>{
    return {
        type: actionTypes.FETCH_POST_RESET,
    };
}

export const fetchPostFail = (err) => {
    return {
        type: actionTypes.FETCH_POST_FAIL,
        err
    }
};

export const fetchPost = (posts, skipPost, ptTotal) => {
    return {
        type: actionTypes.FETCH_POST,
        posts,
        skipPost,
        ptTotal
    }
};