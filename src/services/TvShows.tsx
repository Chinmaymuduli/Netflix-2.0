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
    TopRated: builder.query<MovieApiResponse, void>({
      query: () => ({
        url: `tv/top_rated?api_key=${MOVIE_API_KEYS}&language=en-US`,
      }),
    }),
    AiringToday: builder.query<MovieApiResponse, void>({
      query: () => ({
        url: `tv/airing_today?api_key=${MOVIE_API_KEYS}&language=en-US`,
      }),
    }),
    TvDetails: builder.query<any, {tv_id: any}>({
      query: ({tv_id}) => ({
        url: `tv/${tv_id}?api_key=${MOVIE_API_KEYS}&language=en-US`,
      }),
    }),
    TvVideoDetails: builder.query<any, {tv_id: any}>({
      query: ({tv_id}) => ({
        url: `tv/${tv_id}/videos?api_key=${MOVIE_API_KEYS}&language=en-US`,
      }),
    }),
    TvStarDetails: builder.query<any, {tv_id: any}>({
      query: ({tv_id}) => ({
        url: `tv/${tv_id}/credits?api_key=${MOVIE_API_KEYS}&language=en-US`,
      }),
    }),
    similarTvShow: builder.query<any, {tv_id: any}>({
      query: ({tv_id}) => ({
        url: `tv/${tv_id}/similar?api_key=${MOVIE_API_KEYS}&language=en-US`,
      }),
    }),
  }),
});
export const {
  useTvShowQuery,
  useTopRatedQuery,
  useAiringTodayQuery,
  useTvDetailsQuery,
  useTvVideoDetailsQuery,
  useTvStarDetailsQuery,
  useSimilarTvShowQuery,
} = TvShows;
