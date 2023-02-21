import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL, MOVIE_API_KEYS} from '../utils';

export interface MovieApiResponse {
  status: string;
  message: string;
  results?: any;
}
export const TvShows = createApi({
  reducerPath: 'TvShows',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    TvShow: builder.query<MovieApiResponse, void>({
      query: () => ({
        url: `tv/popular?api_key=${MOVIE_API_KEYS}&language=en-US`,
      }),
    }),
  }),
});
export const {useTvShowQuery} = TvShows;
