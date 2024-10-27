import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Article from "@/components/Article";
import PagerView from "react-native-pager-view";
import MyPager from "@/components/PagerView";
import axios from "axios";
import VideoArticle from "@/components/Articles/VideoArticle";
import SwiperFlatList from "react-native-swiper-flatlist";

export default function FeedScreen() {
	const [articles, setArticles] = useState<ArticleWithPopulatedTopic[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleChangeIndexValue = ({ index }: { index: number }) => {
		setCurrentIndex(index);
	};

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
			<SwiperFlatList
				vertical={true}
				onChangeIndex={handleChangeIndexValue}
				data={articles}
				renderItem={({ item: article, index }) => (
					<Article
						key={index}
						article={article}
						index={index}
						currentIndex={currentIndex}
					/>
				)}
				keyExtractor={(item, index) => `${index}`}
			/>
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
