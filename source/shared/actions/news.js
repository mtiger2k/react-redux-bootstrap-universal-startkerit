'use strict';
import {
    FETCH_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAIL
} from './types'

export function fetchNews() {
    return  {
            types: [FETCH_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAIL],
            promise: client => client.get('https://reactjsblueprints-newsapi.herokuapp.com/stories')
    };
}