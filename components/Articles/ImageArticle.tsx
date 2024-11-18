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

export default function ImageArticle({
	article,
}: {
	article: ArticleWithPopulatedTopic;
}) {
	const windowWidth = Dimensions.get("screen").width;
	const windowHeight = Dimensions.get("screen").height;
	const openOriginalArticle = async () =>
		await WebBrowser.openBrowserAsync(article.url);

	return (
		<SafeAreaView style={styles.container}>
			<PagerView
				orientation={"horizontal"}
				initialPage={0}
				style={{ height: windowHeight - 40 }}
			>
				{article.images.map((image, index) => (
					<View key={index} style={{ width: "100%", height: "100%" }}>
						<ImageBackground
							source={{ uri: image }}
							style={{
								width: windowWidth,
								height: windowHeight - 50,
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
