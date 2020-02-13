import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import sessionReducer from './sessionReducer'
import userReducer from './userReducer'

const reducer = combineReducers(
    {
        session: sessionReducer,
        user: userReducer,
        routerReducer
    }
)

export default reducer