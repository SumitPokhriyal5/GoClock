import { applyMiddleware, combineReducers, compose, legacy_createStore } from '@reduxjs/toolkit'
import { userReducer } from './user/user.reducer'
import { messagesReducer } from './messages/messages.reducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    user: userReducer,
    messages: messagesReducer
})


export const store = legacy_createStore(rootReducer, compose(applyMiddleware(thunk)))

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch