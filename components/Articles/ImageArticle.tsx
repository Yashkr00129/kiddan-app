import {
	Dimensions,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";
import React from "react";
import PagerView from "react-native-pager-view";

import * as WebBrowser from "expo-web-browser";
import AppButton from "@/components/ui/AppButton";
import { articleHeight, articleMargin } from "@/constants/styles";
import { articleFlatlistRef } from "@/refs/articleFlatlist";

export default function ImageArticle({
	article,
}: {
	article: ArticleWithPopulatedTopic;
}) {
	const openOriginalArticle = async () =>
		await WebBrowser.openBrowserAsync(article.url);

	return (
		<SafeAreaView>
			<PagerView
				orientation={"horizontal"}
				initialPage={0}
				style={{ height: articleHeight, marginBottom: articleMargin }}
				onPageScrollStateChanged={(e) => {
					if (
						e.nativeEvent.pageScrollState === "dragging" ||
						e.nativeEvent.pageScrollState === "settling"
					) {
						articleFlatlistRef.current?.setNativeProps({
							scrollEnabled: false,
						});
						// @ts-ignore
					} else if (e.nativeEvent.pageScrollState === "idle") {
						setTimeout(() => {
							articleFlatlistRef.current?.setNativeProps({
								scrollEnabled: true,
							});
						}, 1000);
					}
				}}
			>
				{article.images.map((image, index) => (
					<View key={index} style={{ width: "100%", height: "100%" }}>
						<ImageBackground
							source={{ uri: image }}
							style={{
								width: "100%",
								height: "100%",
							}}
						>
							<View style={styles.readMoreButtonContainer}>
								<AppButton
									title="View More"
									onPress={openOriginalArticle}
									style={{}}
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
		width: "100%",
		height: "100%",
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
