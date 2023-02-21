import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL, MOVIE_API_KEYS} from '../utils';

export interface MovieApiResponse {
  status: string;
  message: string;
  results?: any;
}
export const MovieApi = createApi({
  reducerPath: 'MovieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    Movie: builder.query<MovieApiResponse, void>({
      query: () => ({
        url: `movie/now_playing?api_key=${MOVIE_API_KEYS}`,
      }),
    }),
    Upcoming: builder.query<MovieApiResponse, void>({
      query: () => ({
        url: `movie/top_rated?api_key=${MOVIE_API_KEYS}`,
      }),
    }),
    NewRelease: builder.query<MovieApiResponse, void>({
      query: () => ({
        url: `trending/all/week?api_key=${MOVIE_API_KEYS}&language=en-US`,
      }),
    }),
  }),
});
export const {useMovieQuery, useUpcomingQuery, useNewReleaseQuery} = MovieApi;
