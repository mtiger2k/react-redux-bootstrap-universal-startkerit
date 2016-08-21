import { combineReducers } from 'redux';
import auth from './auth';
import news from './news';
import message from './message';
import { routerReducer as routing } from 'react-router-redux';

export default combineReducers({
    auth,
    news,
    message,
    routing
});