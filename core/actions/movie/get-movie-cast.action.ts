import { movieApi } from "@/core/api/movieApi";
import { Cast } from "@/infraestructure/interfaces/moviedb-cast";
import { CreditsResponse } from "@/infraestructure/interfaces/moviedb-credits.response";
import { CastMapper } from "@/infraestructure/mappers/cast.mapper";


export const getMovieCastAction = async (id: number): Promise<Cast[]> => {

  try {
    const { data } = await movieApi.get<CreditsResponse>(`/${id}/credits`);

    return data.cast.map((c) => CastMapper.fromMovieDBCastToEntity(c));

  } catch (error) {
    console.log(error)
    throw 'Cannot load now playing movies'
  }



}