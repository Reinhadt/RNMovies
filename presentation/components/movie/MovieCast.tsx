import { Cast } from "@/infraestructure/interfaces/moviedb-cast";
import React from "react";
import { FlatList, View } from "react-native";
import { ActorCard } from "./ActorCard";

interface Props {
	cast: Cast[] | undefined;
}

// steps
/**
 * create interface for cast
 * create interface for moviedb response
 * create action for axios http call
 * create mapper for the respose
 * hook to the usemovie hook by using usequery
 */

const MovieCast = ({ cast }: Props) => {
	return (
		<View>
			<FlatList
				horizontal
				data={cast}
				keyExtractor={(item, i) => `${item.id} - ${i}`}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => <ActorCard actor={item} />}
			/>
		</View>
	);
};

export default MovieCast;
