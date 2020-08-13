import { put } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchPostInitSaga(action) {
    if (action.ptTotal > action.skipPost) {
        yield put(actions.fetchPostStart());
    }
    try {
        if (action.ptTotal === 0 || action.ptTotal > action.skipPost) {
            let response = yield axios.post('/blog', null,{
                headers: {
                    'data-categ': action.fetchType, 
                    'limit': action.fetchLimit, 
                    'skip': action.skipPost}});
            yield put(actions.fetchPost(response.data.cnt, action.skipPost, response.data.cntTotal));
        }  
        
    } catch(err){
        yield put(actions.fetchPostFail(err))
    }
    
}
