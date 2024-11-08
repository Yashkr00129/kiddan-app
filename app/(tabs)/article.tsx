import {ActivityIndicator, StyleSheet, View} from "react-native";
import React, {useLayoutEffect, useState} from "react";
import {useLocalSearchParams} from "expo-router";

import Article from "@/components/Article";
import axios from "axios";
import SwiperFlatList from "react-native-swiper-flatlist";

export default function FeedScreen() {
	const params = useLocalSearchParams();
	const [articles, setArticles] = useState<ArticleWithPopulatedTopic[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleChangeIndexValue = ({ index }: { index: number }) => {
		setCurrentIndex(index);
	};


	useLayoutEffect(() => {
		const api_url = params.topic
			? `/api/article?topic=${params.topic}`
			: "/api/article";

		setLoading(true)
		axios
			.get(api_url)
			.then((response) => {
				if (!params.articleId) {
					setArticles(response.data);
				} else {
					const articles = response.data as ArticleWithPopulatedTopic[];
					const articleToBeFirstIndex = articles.findIndex(article => article._id === params.articleId);
					const articleToBeFirst = articles[articleToBeFirstIndex]
					const newArticles = [articleToBeFirst, ...articles.filter(article => article._id === params.articleId)];
					setArticles(newArticles);
				}

			})
			.catch((error) => {
				console.log(error);

			}).finally(() => setLoading(false));
	}, [params.topic, params.articleId]);


	if (loading) return <ActivityIndicator/>;




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
