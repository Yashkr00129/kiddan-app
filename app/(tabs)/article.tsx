import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Article from "@/components/Article";
import PagerView from "react-native-pager-view";
import MyPager from "@/components/PagerView";
import axios from "axios";

export default function FeedScreen() {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get("/api/article")
			.then((response) => {
				setArticles(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);
	return (
		<View style={styles.container}>
			<PagerView
				style={styles.container}
				initialPage={0}
				orientation={"vertical"}
			>
				{articles.map((article, index) => (
					<Article key={index} article={article} />
				))}
			</PagerView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	pagerView: {
		width: "100%",
		height: "100%",
	},
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
});
