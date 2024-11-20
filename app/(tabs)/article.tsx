import {
	ActivityIndicator,
	Dimensions,
	Platform,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import Article from "@/components/Article";
import axios from "axios";
import SwiperFlatList from "react-native-swiper-flatlist";

export default function FeedScreen() {
	const params = useLocalSearchParams();
	const [articles, setArticles] = useState<ArticleWithPopulatedTopic[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);

	const { height, width } = Dimensions.get("screen");

	const handleChangeIndexValue = ({ index }: { index: number }) => {
		setCurrentIndex(index);
	};

	useLayoutEffect(() => {
		const api_url = params.topic
			? `/api/article?topic=${params.topic}`
			: "/api/article";

		setLoading(true);
		axios
			.get(api_url)
			.then((response) => {
				if (!params.articleId) {
					setArticles(response.data);
					console.log([...response.data].reverse().length);
				} else {
					const articles = response.data as ArticleWithPopulatedTopic[];
					const articleToBeFirstIndex = articles.findIndex(
						(article) => article._id === params.articleId
					);
					const articleToBeFirst = articles[articleToBeFirstIndex];
					const newArticles = [
						articleToBeFirst,
						...articles.filter((article) => article._id !== params.articleId),
					];
					setArticles(newArticles);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setLoading(false));
	}, [params.topic, params.articleId]);

	const renderItem = useCallback(
		({ item: article, index }: any) => (
			<View
				style={[
					{
						flex: 1,
					},
					{ height, width },
				]}
			>
				<Article
					key={article._id}
					article={article}
					index={index}
					currentIndex={currentIndex}
				/>
			</View>
		),
		[height, width, currentIndex]
	);

	if (loading) return <ActivityIndicator />;

	return (
		<SafeAreaView
			style={{
				height: height,
				width: width,
			}}
		>
			<SwiperFlatList
				vertical={true}
				windowSize={100}
				initialNumToRender={3}
				maxToRenderPerBatch={5}
				removeClippedSubviews={Platform.OS === "android"}
				onChangeIndex={handleChangeIndexValue}
				data={articles}
				snapToInterval={height}
				decelerationRate="fast"
				bounces={false}
				renderItem={renderItem}
				keyExtractor={(item, index) => `${index}`}
				viewabilityConfig={{
					itemVisiblePercentThreshold: 50,
				}}
				contentContainerStyle={styles.listContent}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	// container: {
	// 	flex: ,
	// },
	pagerView: {
		width: "100%",
		height: "100%",
	},
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
	listContent: {
		// This ensures the last item is fully scrollable
		flexGrow: 1,
	},
});
