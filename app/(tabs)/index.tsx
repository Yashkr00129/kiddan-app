import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FeaturedArticle from "@/components/FeaturedArticle";
import Topic from "@/components/Topic";
import NotificationList from "@/components/NotificationList";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import AppLoader from "@/components/ui/AppLoader";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ExploreScreen() {
	const navigation = useNavigation();

	const [topics, setTopics] = useState<Topic[]>([]);
	const [featuredArticles, setFeaturedArticles] = useState<
		ArticleWithPopulatedTopic[]
	>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [navigation]);

	useLayoutEffect(() => {
		const loadAllData = async () => {
			await axios
				.get("/api/topic")
				.then((response) => {
					setTopics(response.data as Topic[]);
				})
				.catch((error) => {
					console.log(error);
				});

			await axios
				.get("/api/article?featured=true&limit=10")
				.then((response) => {
					setFeaturedArticles(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		setLoading(true);
		loadAllData().then(() => setLoading(false));
	}, []);

	if (loading) return <AppLoader />;

	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 10,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 10,
					}}
				>
					<Image
						source={require("@/assets/images/kiddaan_app_logo.jpg")}
						style={{
							height: 30,
							width: 30,
						}}
					/>
					<Text style={[styles.headingLarge, { color: "purple" }]}>
						Kiddaan
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 5,
					}}
				>
					<Text style={styles.headingSmall}>MY FEED</Text>
					<AntDesign name="arrowright" size={20} color="purple" />
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
