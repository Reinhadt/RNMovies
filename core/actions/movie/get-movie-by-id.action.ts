import { movieApi } from "@/core/api/movieApi"
import { CompleteMovie } from "@/infraestructure/interfaces/movie.interface"
import { MovieDBResponse } from "@/infraestructure/interfaces/moviedb-movie.response"
import { MovieMapper } from "@/infraestructure/mappers/movie.mapper"

export const getMovieByIdAction = async (id: number | string): Promise<CompleteMovie> => {
  try {
    const { data } = await movieApi.get<MovieDBResponse>(`/${id}`)

    return MovieMapper.fromTheMovieDBToCompleteMovie(data)

  } catch (error) {
    console.log(error)
    throw 'Cannot load now playing movies'
  }
}