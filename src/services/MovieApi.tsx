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
    movieDetails: builder.query<any, {movie_id: any}>({
      query: ({movie_id}) => ({
        url: `movie/${movie_id}?api_key=${MOVIE_API_KEYS}&language=en-US`,
      }),
    }),
    movieActors: builder.query<any, {movie_id: any}>({
      query: ({movie_id}) => ({
        url: `movie/${movie_id}/credits?api_key=${MOVIE_API_KEYS}&language=en-US`,
      }),
    }),
    similarMovie: builder.query<any, {movie_id: any}>({
      query: ({movie_id}) => ({
        url: `movie/${movie_id}/similar?api_key=${MOVIE_API_KEYS}&language=en-US`,
      }),
    }),
    getMovieVideo: builder.query<any, {movie_id: any}>({
      query: ({movie_id}) => ({
        url: `movie/${movie_id}/videos?api_key=${MOVIE_API_KEYS}&language=en-US`,
      }),
    }),
  }),
});
export const {
  useMovieQuery,
  useUpcomingQuery,
  useNewReleaseQuery,
  useMovieDetailsQuery,
  useMovieActorsQuery,
  useSimilarMovieQuery,
  useGetMovieVideoQuery,
} = MovieApi;
