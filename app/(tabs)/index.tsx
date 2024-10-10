import { Text, View, StyleSheet, ScrollView } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FeaturedArticle from "@/components/FeaturedArticle";
import Topic from "@/components/Topic";
import NotificationList from "@/components/NotificationList";

export default function ExploreScreen() {
	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<Text style={styles.headingLarge}>Featured Stories</Text>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 10,
					}}
				>
					<Text>My Feed</Text>
					<MaterialCommunityIcons name="arrow-right" size={24} color="black" />
				</View>
			</View>
			<View style={styles.featuredStoriesContainer}>
				<ScrollView horizontal>
					<FeaturedArticle />
					<FeaturedArticle />
					<FeaturedArticle />
				</ScrollView>
			</View>
			<View>
				<View style={styles.topicContainer}>
					<Text style={styles.topicSectionHeading}>Filter By Topics</Text>
				</View>
				<ScrollView style={styles.topics} horizontal>
					<Topic />
					<Topic />
					<Topic />
					<Topic />
					<Topic />
					<Topic />
					<Topic />
					<Topic />
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
		fontSize: 18,
		fontWeight: "bold",
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
