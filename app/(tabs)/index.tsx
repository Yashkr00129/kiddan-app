import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image,
	RefreshControl,
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
import Notification from "@/components/Notification";

export default function ExploreScreen() {
	const navigation = useNavigation();

	const [topics, setTopics] = useState<Topic[]>([]);
	const [featuredArticles, setFeaturedArticles] = useState<
		ArticleWithPopulatedTopic[]
	>([]);
	const [notifications, setNotifications] = useState<DbNotification[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [navigation]);

	const loadAllData = async () => {
		setLoading(true);
		await axios
			.get("/api/topic?featured=true")
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

		await axios
			.get("/api/notification?limit=3")
			.then((response) => {
				setNotifications(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		setLoading(false);
	};

	useLayoutEffect(() => {
		loadAllData();
	}, []);

	if (loading) return <AppLoader />;

	return (
		<ScrollView
			style={styles.container}
			refreshControl={
				<RefreshControl
					refreshing={loading}
					onRefresh={loadAllData}
					tintColor="#000" // iOS
					colors={["#000"]} // Android
				/>
			}
		>
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
					<Text
						onPress={() => router.push("/articles")}
						style={styles.headingSmall}
					>
						MY FEED
					</Text>
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

			<View style={styles.topicSectionHeadingContainer}>
				<Text style={styles.topicSectionHeading}>Filter By Topics</Text>
				<View style={{}}>
					<Text
						onPress={() => router.push("/topics")}
						style={styles.headingSmall}
					>
						VIEW ALL
					</Text>
				</View>
			</View>
			<ScrollView
				style={styles.topics}
				horizontal
				showsHorizontalScrollIndicator={false}
			>
				{topics.map((topic) => (
					<TouchableOpacity
						key={topic._id}
						onPress={() => router.push(`/articles?topic=${topic._id}`)}
					>
						<Topic image={topic.image} title={topic.title} />
					</TouchableOpacity>
				))}
			</ScrollView>

			<View>
				<View style={styles.header}>
					<Text style={styles.heading}>Latest</Text>

					<Text
						style={styles.viewButton}
						onPress={() => router.push("/notification")}
					>
						VIEW ALL
					</Text>
				</View>
				{/* <NotificationList limit={3} /> */}
				{notifications.map((notification, index) => (
					<Notification notification={notification} key={index} />
				))}
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
	heading: {
		fontSize: 20,
		fontWeight: "500",
		paddingTop: 20,
		paddingBottom: 10,
	},
	viewButton: {
		fontSize: 14,
		fontWeight: "bold",
		paddingTop: 20,
		paddingBottom: 10,
		color: "purple",
	},

	topicSectionHeading: {
		fontSize: 20,
		fontWeight: "500",
	},
	topicSectionHeadingContainer: {
		marginTop: 20,
		paddingBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 5,
	},
	topics: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
});
