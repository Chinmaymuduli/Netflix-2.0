import {configureStore} from '@reduxjs/toolkit';
import {MovieApi, TvShows} from '../services';

export const store = configureStore({
  reducer: {
    [MovieApi.reducerPath]: MovieApi.reducer,
    [TvShows.reducerPath]: TvShows.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([MovieApi.middleware, TvShows.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
