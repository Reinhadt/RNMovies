import MainSlideshow from "@/presentation/components/MainSlideshow";
import MovieHorizontalList from "@/presentation/components/movies/MovieHorizontalList";
import { useMovies } from "@/presentation/hooks/useMovies";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
	const safeArea = useSafeAreaInsets();

	const {
		nowPlayingQuery,
		// popularQuery,
		// useWildCardQuery,
		useInfiniteWildCardQuery,
	} = useMovies();

	const topRated = useInfiniteWildCardQuery("top_rated");
	const upcoming = useInfiniteWildCardQuery("upcoming");
	const popular = useInfiniteWildCardQuery("popular");

	if (nowPlayingQuery.isLoading) {
		return (
			<View className="justify-center items-center flex-1">
				<ActivityIndicator color="purple" size={40} />
			</View>
		);
	}

	return (
		<ScrollView>
			<View className="mt-2 pb-10" style={{ paddingTop: safeArea.top }}>
				<Text className="text-3xl font-bold px-4 mb-2">Movies</Text>

				{/* carousel */}
				<MainSlideshow movies={nowPlayingQuery.data ?? []} />

				{/* Popular */}
				<MovieHorizontalList
					title="Popular"
					movies={popular.data?.pages.flat() ?? []}
					// movies={popularQuery.data ?? []}
					className="mb-5"
					loadNextPage={popular.fetchNextPage}
				/>

				{/* top rated */}
				<MovieHorizontalList
					title="Top Rated"
					movies={topRated.data?.pages.flat() ?? []}
					className="mb-5"
					loadNextPage={topRated.fetchNextPage}
				/>

				{/* upcoming */}
				<MovieHorizontalList
					title="Upcoming"
					movies={upcoming.data?.pages.flat() ?? []}
					loadNextPage={upcoming.fetchNextPage}
				/>
			</View>
		</ScrollView>
	);
};

export default HomeScreen;
