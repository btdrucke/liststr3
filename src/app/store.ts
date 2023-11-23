import {configureStore} from '@reduxjs/toolkit'
import appModeReducer from '../features/appMode/appModeSlice'
import marketsReducer from '../features/markets/marketsSlice'

const store = configureStore({
    reducer: {
        appMode: appModeReducer,
        markets: marketsReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store