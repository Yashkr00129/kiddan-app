import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import PagerView from "react-native-pager-view";

export default function Article() {
	const [article, setArticle] = useState<Article>();

	useLayoutEffect(() => {
		const fetchArticle = async () => {
			setArticle({
				id: 1,
				title:
					"Big setback': Why India's Congress lost out to Modi in key state election",
				topic: "Tech",
				text: `New Delhi, India - Four months after losing its majority in parliament for the first time in a decade, Prime Minister Narendra Modi's Bharatiya Janata Party (BJP) secured a record third term in the northern state of Haryana and scored its best ever performance in Indian-administered Kashmir, marking a dramatic turnaround. The results of the two northern states' assembly elections announced on Tuesday also represent a significant setback for the opposition Congress party's bid to end the BJP's dominance over electoral politics in India since 2014, political analysts told Al Jazeera on Wednesday.`,
				image:
					"https://images.unsplash.com/photo-1697130383976-38f28c444292?q=80&w=2526&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				featured: false,
			});
		};
		fetchArticle();
	}, []);

	if (!article) {
		return null;
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Image
					source={{
						uri: article.image,
					}}
					style={styles.image}
				/>
				<View style={styles.controls}>
					<View style={styles.topic}>
						<Text style={{ color: "white" }}>{article.topic}</Text>
					</View>
					<View style={styles.controlGroup}>
						<Feather name="bookmark" size={30} color="purple" />
						<Feather name="share-2" size={30} color="purple" />
					</View>
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.heading}>{article.title}</Text>
					{/* <PagerView style={styles.container} initialPage={0}>
						<View style={styles.page}>
							<Text style={styles.articleText}>{article.text}</Text>
						</View>
						<View style={styles.page}>
							<Text style={styles.articleText}>{article.text}</Text>
						</View>
						<View style={styles.page}>
							<Text style={styles.articleText}>{article.text}</Text>
						</View>
					</PagerView> */}
					<Text style={styles.articleText}>{article.text}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	image: {
		height: 300,
		width: "100%",
	},
	container: {
		flex: 1,
	},
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
	controls: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 12,
		paddingBottom: 0,
	},
	controlGroup: {
		flexDirection: "row",
		gap: 10,
	},
	textContainer: {
		padding: 10,
	},
	heading: {
		fontSize: 22,
		fontWeight: "500",
	},
	articleText: {
		fontSize: 16,
		textAlign: "left",
		paddingTop: 10,
	},
	topic: {
		backgroundColor: "purple",
		padding: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
});
