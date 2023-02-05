import {configureStore} from '@reduxjs/toolkit';
import {MovieApi} from '../services';

export const store = configureStore({
  reducer: {
    [MovieApi.reducerPath]: MovieApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([MovieApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
