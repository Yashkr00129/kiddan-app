import { Text, View, StyleSheet, ScrollView } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FeaturedArticle from "@/components/FeaturedArticle";
import Topic from "@/components/Topic";
import NotificationList from "@/components/NotificationList";
import axios from "axios";
import { useLayoutEffect, useState } from "react";

export default function ExploreScreen() {
	const [topics, setTopics] = useState<Topic[]>([]);

	useLayoutEffect(() => {
		axios
			.get("/api/topic")
			.then((response) => {
				setTopics(response.data as Topic[]);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<Text style={styles.headingLarge}>Featured Stories</Text>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 5,
					}}
				>
					<Text style={styles.headingSmall}>MY FEED</Text>
					<MaterialCommunityIcons name="arrow-right" size={24} color="purple" />
				</View>
			</View>
			<View style={styles.featuredStoriesContainer}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<FeaturedArticle />
					<FeaturedArticle />
					<FeaturedArticle />
					<FeaturedArticle />
					<FeaturedArticle />
					<FeaturedArticle />
				</ScrollView>
			</View>
			<View>
				<View style={styles.topicContainer}>
					<Text style={styles.topicSectionHeading}>Filter By Topics</Text>
				</View>
				<ScrollView
					style={styles.topics}
					horizontal
					showsHorizontalScrollIndicator={false}
				>
					{topics.map((topic) => (
						<Topic key={topic._id} image={topic.image} title={topic.title} />
					))}
				</ScrollView>
			</View>
			<View>
				<NotificationList />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		paddingTop: 20,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headingLarge: {
		fontSize: 24,
		fontWeight: "500",
	},
	headingSmall: {
		fontSize: 14,
		fontWeight: "bold",

		color: "purple",
	},
	featuredStoriesContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 20,
	},
	topicContainer: {},
	topicSectionHeading: {
		fontSize: 20,
		fontWeight: "500",
		paddingTop: 20,
		paddingBottom: 10,
	},
	topics: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
});
