import { Text, View, StyleSheet, ScrollView } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FeaturedArticle from "@/components/FeaturedArticle";
import Topic from "@/components/Topic";
import NotificationList from "@/components/NotificationList";

const topics: Topic[] = [
	{
		id: 1,
		image:
			"https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		title: "Tech",
	},
	{
		id: 2,
		image:
			"https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		title: "Bollywood",
	},
	{
		id: 3,
		image:
			"https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		title: "Wildlife",
	},
	{
		id: 4,
		image:
			"https://images.unsplash.com/photo-1697130383976-38f28c444292?q=80&w=2526&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		title: "Politics",
	},
	{
		id: 5,
		image:
			"https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		title: "Crime",
	},
];

export default function ExploreScreen() {
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
					<MaterialCommunityIcons
						name="arrow-right"
						size={24}
						color="#00308F"
					/>
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
						<Topic key={topic.id} image={topic.image} title={topic.title} />
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
		fontWeight: "bold",
	},
	headingSmall: {
		fontSize: 12,
		fontWeight: "bold",

		color: "#00308F",
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
		fontWeight: "bold",
		paddingTop: 20,
		paddingBottom: 10,
	},
	topics: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
});
