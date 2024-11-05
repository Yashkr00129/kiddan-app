import { StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

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

	console.log(params);

	useLayoutEffect(() => {
		const api_url = params.topic
			? `/api/article?topic=${params.topic}`
			: "/api/article";

		axios
			.get(api_url)
			.then((response) => {
				setArticles(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [params.topic]);

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
