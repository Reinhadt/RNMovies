import { genericAction } from "@/core/actions/movies/genericAction";
import { nowPlayingAction } from "@/core/actions/movies/now-playing.action";
import { popularMoviesAction } from "@/core/actions/movies/popular";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useMovies = () => {
	const useWildCardQuery = (utilityQueryKey: string) => {
		return useQuery({
			queryKey: ["movies", utilityQueryKey],
			queryFn: () => genericAction(utilityQueryKey, { page: 1 }),
			staleTime: 1000 * 60 * 60 * 24,
		});
	};

	const useInfiniteWildCardQuery = (utilityQueryKey: string) => {
		return useInfiniteQuery({
			initialPageParam: 1,
			queryKey: ["infiniteMovies", utilityQueryKey],
			queryFn: ({ pageParam }) => {
				return genericAction(utilityQueryKey, { page: pageParam });
			},
			staleTime: 1000 * 60 * 60 * 24,
			getNextPageParam: (lastPage, pages) => pages?.length + 1,
		});
	};

	const nowPlayingQuery = useQuery({
		queryKey: ["movies", "nowPlaying"],
		queryFn: nowPlayingAction,
		staleTime: 1000 * 60 * 60 * 24,
	});

	const popularQuery = useQuery({
		queryKey: ["movies", "popular"],
		queryFn: popularMoviesAction,
		staleTime: 1000 * 60 * 60 * 24,
	});

	return {
		nowPlayingQuery,
		popularQuery,
		useWildCardQuery,
		useInfiniteWildCardQuery,
	};
};
