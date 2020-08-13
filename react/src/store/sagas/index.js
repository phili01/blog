import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { fetchCategInitSaga, 
    addCategInitSaga, 
    checkLinkInitSaga} from './form';
    import { fetchPostInitSaga } from './post';

export function* watchForm() {
    yield all([
       takeEvery(actionTypes.FETCH_CATEG_INIT, fetchCategInitSaga),
       takeEvery(actionTypes.ADD_CATEG_INIT, addCategInitSaga),
       takeEvery(actionTypes.CHECK_LINK_INIT, checkLinkInitSaga)
    ])
}

export function* watchPt() {
    yield all([
        takeLatest(actionTypes.FETCH_POST_INIT, fetchPostInitSaga)
    ])
} 
