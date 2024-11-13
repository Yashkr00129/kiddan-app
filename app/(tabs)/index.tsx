import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FeaturedArticle from "@/components/FeaturedArticle";
import Topic from "@/components/Topic";
import NotificationList from "@/components/NotificationList";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { router, useNavigation } from "expo-router";

export default function ExploreScreen() {
	const navigation = useNavigation();

	const [topics, setTopics] = useState<Topic[]>([]);
	const [featuredArticles, setFeaturedArticles] = useState<
		ArticleWithPopulatedTopic[]
	>([]);

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [navigation]);

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
				{/* <Text style={styles.headingLarge}>Featured Stories</Text> */}
				{/*<View*/}
				{/*	style={{*/}
				{/*		flexDirection: "row",*/}
				{/*		alignItems: "center",*/}
				{/*		gap: 5,*/}
				{/*	}}*/}
				{/*>*/}
				{/*	<Text style={styles.headingSmall}>MY FEED</Text>*/}
				{/*	<MaterialCommunityIcons name="arrow-right" size={24} color="purple" />*/}
				{/*</View>*/}
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
					<TouchableOpacity
						key={topic._id}
						onPress={() => router.push(`/article?topic=${topic._id}`)}
					>
						<Topic image={topic.image} title={topic.title} />
					</TouchableOpacity>
				))}
			</ScrollView>

			<View>
				<NotificationList limit={3} />
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
