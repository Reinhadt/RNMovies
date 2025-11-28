import MovieCast from "@/presentation/components/movie/MovieCast";
import MovieDescription from "@/presentation/components/movie/MovieDescription";
import MovieHeader from "@/presentation/components/movie/MovieHeader";
import { useMovie } from "@/presentation/hooks/useMovie";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

const MovieScreen = () => {
	const { id } = useLocalSearchParams();

	const { movieQuery, movieCastQuery } = useMovie(+id);

	if (movieQuery.isLoading || !movieQuery.data) {
		return (
			<View className="flex flex-1 justify-center items-center">
				<Text className="mb-5">Loading...</Text>
				<ActivityIndicator color="purple" size={30} />
			</View>
		);
	}

	return (
		<ScrollView>
			<MovieHeader
				originalTitle={movieQuery.data.title}
				poster={movieQuery.data.poster}
				title={movieQuery.data.originalTitle}
			/>
			<MovieDescription movie={movieQuery.data} />
			<MovieCast cast={movieCastQuery.data} />
		</ScrollView>
	);
};

export default MovieScreen;
