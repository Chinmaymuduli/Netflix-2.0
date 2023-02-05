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
        url: `now_playing?api_key=${MOVIE_API_KEYS}`,
      }),
    }),
  }),
});
export const {useMovieQuery} = MovieApi;
