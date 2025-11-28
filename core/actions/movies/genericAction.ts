import { MovieDBMoviesResponse } from '@/infraestructure/interfaces/moviedb-response';
import { MovieMapper } from '@/infraestructure/mappers/movie.mapper';
import { movieApi } from '../../api/movieApi';

interface Options {
  page?: number;
  limit?: number;
}


export const genericAction = async (url: string, { page = 1, limit = 10 }: Options) => {
  try {
    const { data } = await movieApi.get<MovieDBMoviesResponse>(url, {
      params: {
        page,
      }
    })

    const movies = data.results.map(MovieMapper.fromTheMovieDBToMovie)
    return movies

  } catch (error) {
    console.log(error)
    throw 'Cannot load now playing movies'
  }
}