import {
	Button,
	Image,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useState } from "react";
import PagerView from "react-native-pager-view";
import * as WebBrowser from "expo-web-browser";

export default function ImageArticle({
	article,
}: {
	article: ArticleWithPopulatedTopic;
}) {
	const openOriginalArticle = async () =>
		await WebBrowser.openBrowserAsync(article.url);

	return (
		<SafeAreaView style={styles.container}>
			<PagerView
				orientation={"horizontal"}
				initialPage={0}
				style={{ height: "100%" }}
			>
				{article.images.map((image, index) => (
					<View key={index}>
						<ImageBackground
							source={{ uri: image }}
							style={{ height: "100%", width: "100%" }}
						>
							<View style={styles.readMoreButtonContainer}>
								<Button
									title="Read More"
									onPress={openOriginalArticle}
									color={"purple"}
								/>
							</View>
						</ImageBackground>
					</View>
				))}
			</PagerView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	readMoreButtonContainer: {
		position: "absolute",
		bottom: 0,
		padding: 20,
		margin: "auto",
		alignSelf: "center",
		width: 200,
	},
});
