import { Text, View, StyleSheet, ScrollView } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FeaturedArticle from "@/components/FeaturedArticle";
import Topic from "@/components/Topic";
import NotificationList from "@/components/NotificationList";
import axios from "axios";
import { useLayoutEffect, useState } from "react";

export default function ExploreScreen() {
	const [topics, setTopics] = useState<Topic[]>([]);
	const [featuredArticles, setFeaturedArticles] = useState<
		ArticleWithPopulatedTopic[]
	>([]);

	useLayoutEffect(() => {
		axios
			.get("/api/topic")
			.then((response) => {
				setTopics(response.data as Topic[]);
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get("/api/article?featured=true")
			.then((response) => {
				setFeaturedArticles(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<View style={styles.container}>
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

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={{ paddingTop: 20 }}
			>
				{featuredArticles.map((article, index) => (
					<FeaturedArticle key={index} article={article} />
				))}
			</ScrollView>

			<View>
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

			<View>
				<NotificationList />
			</View>
		</View>
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
