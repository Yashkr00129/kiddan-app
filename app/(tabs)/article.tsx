import {
	Dimensions,
	Platform,
	SafeAreaView,
	View,
	RefreshControl,
	FlatList,
	ViewToken,
} from "react-native";
import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useLocalSearchParams, usePathname } from "expo-router";

import Article from "@/components/Article";
import axios from "axios";
import SwiperFlatList from "react-native-swiper-flatlist";
import AppLoader from "@/components/ui/AppLoader";
import { articleHeight, articleMargin } from "@/constants/styles";
import { articleFlatlistRef } from "@/refs/articleFlatlist";

export default function FeedScreen() {
	const params = useLocalSearchParams();
	const pathname = usePathname();
	const [articles, setArticles] = useState<ArticleWithPopulatedTopic[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);

	const { height } = Dimensions.get("window");

	const api_url = useMemo(
		() =>
			params.topic ? `/api/article?topic=${params.topic}` : "/api/article",
		[params.topic, pathname]
	);

	const fetchData = async () => {
		setLoading(true);
		axios
			.get(api_url)
			.then((response) => {
				if (!params.articleId) {
					setArticles(response.data);
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
	};

	useLayoutEffect(() => {
		fetchData();
	}, [params.topic, params.articleId, pathname]);

	console.log(currentIndex);

	if (loading) return <AppLoader />;
	return (
		<SafeAreaView>
			<FlatList
				ref={articleFlatlistRef}
				data={articles}
				directionalLockEnabled={true}
				nestedScrollEnabled={true}
				renderItem={({ item: article, index }: any) => (
					<Article
						key={article._id}
						article={article}
						index={index}
						currentIndex={currentIndex}
					/>
				)}
				keyExtractor={(item, index) => `${index}`}
				removeClippedSubviews={true}
				snapToInterval={height}
				decelerationRate={"fast"}
				onViewableItemsChanged={({ changed, viewableItems }) => {
					if (viewableItems.length > 0) {
						setCurrentIndex(viewableItems[0].index || 0);
					}
				}}
				initialNumToRender={10}
				maxToRenderPerBatch={10}
				windowSize={5}
				refreshControl={
					<RefreshControl
						refreshing={loading}
						onRefresh={fetchData}
						tintColor="#000"
						colors={["#000"]}
					/>
				}
			/>
		</SafeAreaView>
	);
}
