import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import urlState from './urlReducer';
import errorState from './errorReducer';
import authState from './authReducer';
import userUrlState from './userurlReducer';

const persistConfig ={
    key:'root',
    storage,
    whitelist:['userUrl']
}
const rootReducer = combineReducers({
    ur: urlState,
    err:errorState,
    auth:authState,
    userUrl:userUrlState
})
// export default combineReducers({ 
//     ur:urlState,
//     err:errorState,
//     auth:authState,
//     userUrl:userUrlState 
// })

export default persistReducer(persistConfig,rootReducer);
