import { MovieDBMoviesResponse } from '@/infraestructure/interfaces/moviedb-response';
import { MovieMapper } from '@/infraestructure/mappers/movie.mapper';
import { movieApi } from '../../api/movieApi';

export const popularMoviesAction = async () => {
  try {
    const { data } = await movieApi.get<MovieDBMoviesResponse>('/popular')

    const movies = data.results.map(MovieMapper.fromTheMovieDBToMovie)

    return movies

  } catch (error) {
    console.log(error)
    throw 'Cannot load now playing movies'
  }
}