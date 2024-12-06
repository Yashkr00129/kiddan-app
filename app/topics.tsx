import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ListItem from "@/components/ui/ListItem";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ListItemSeperator from "@/components/ui/ListItemSeperator";
import { router } from "expo-router";

export default function topics() {
	const [topics, setTopics] = useState<Topic[]>([]);
	const [loading, setLoading] = useState(false);

	const loadAllData = async () => {
		setLoading(true);
		await axios
			.get("/api/topic")
			.then((response) => {
				setTopics(response.data as Topic[]);
			})
			.catch((error) => {
				console.log(error);
			});

		setLoading(false);
	};

	useEffect(() => {
		loadAllData();
	}, []);

	console.log(topics);
	return (
		<GestureHandlerRootView>
			<View>
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={loading}
							onRefresh={loadAllData}
							tintColor="#000"
							colors={["#000"]}
						/>
					}
					data={topics}
					ItemSeparatorComponent={ListItemSeperator}
					renderItem={({ item: topic }) => (
						<ListItem
							title={topic.title}
							// image={{ uri: item.image }}
							onPress={() => router.push(`/article?topic=${topic._id}`)}
						/>
					)}
				/>
			</View>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({});
