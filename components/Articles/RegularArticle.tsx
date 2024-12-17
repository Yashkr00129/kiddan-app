import {
	Dimensions,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import React from "react";

import * as WebBrowser from "expo-web-browser";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { articleHeight, articleMargin } from "@/constants/styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import * as FileSystem from "expo-file-system";
import * as Linking from "expo-linking";
import Share from "react-native-share";

const handleShare = async (article: ArticleWithPopulatedTopic) => {
	try {
		// First, download the image
		const filename = article.previewImage.split("/").pop();
		const filepath = `${FileSystem.cacheDirectory}${filename}`;

		// Download the image to local cache
		await FileSystem.downloadAsync(article.previewImage, filepath);
		const url =
			"https://www.kiddaanapp.com" + "/articles?articleId=" + article._id;

		// Generate the article URL
		Share.open({
			url: filepath,
			title: `${article.title} \n ${url}`,
			message: `${article.title} \n ${url}`,
		});
	} catch (error) {
		console.error("Error sharing:", error);
	}
};

export default function RegularArticle({
	article,
}: {
	article: ArticleWithPopulatedTopic;
}) {
	const { height } = Dimensions.get("window");
	// const descriptionList = splitByWordCount(article.description, 70);

	if (article.title.startsWith("")) {
	}

	const openOriginalArticle = async () =>
		await WebBrowser.openBrowserAsync(article.url);

	const openKiddaan = async () => {
		await WebBrowser.openBrowserAsync("http://kiddaan.com");
	};

	return (
		<SafeAreaView
			style={{
				height: articleHeight,
				maxHeight: articleHeight,
				marginBottom: articleMargin,
			}}
		>
			<Image
				source={{
					uri: article.images[0],
				}}
				style={styles.image}
			/>
			<View style={styles.brandingContainer}>
				<TouchableOpacity onPress={openKiddaan}>
					<View style={styles.branding}>
						<Text style={styles.brandingText}>Kiddaan</Text>
					</View>
				</TouchableOpacity>
			</View>

			<View style={{ padding: 20, paddingBottom: 0 }}>
				<View
					style={{
						flexDirection: "row",
						gap: 10,
						marginVertical: 10,
						justifyContent: "space-between",
					}}
				>
					<View style={{ flexDirection: "row", gap: 10 }}>
						<AppText
							style={{ color: "purple", fontSize: 13, fontWeight: "semibold" }}
						>
							{new Date(article.createdAt).toDateString()}
						</AppText>

						<AppText
							style={{ color: "purple", fontSize: 13, fontWeight: "semibold" }}
						>
							{new Date(article.createdAt).toLocaleTimeString()}
						</AppText>
					</View>
					<MaterialCommunityIcons
						onPress={() => handleShare(article)}
						name="share-variant"
						size={24}
						color="purple"
					/>
				</View>
				<Text style={styles.heading}>{article.title}</Text>
				{article.contents && article.contents.length === 1 ? (
					<Text style={styles.articleText}>{article.contents[0]}</Text>
				) : (
					<SwiperFlatList
						// index={1}
						showPagination
						paginationStyleItem={{ width: 10, height: 10, marginTop: 30 }}
						paginationStyleItemActive={{ backgroundColor: "purple" }}
						data={article.contents}
						renderItem={({ item: text }) => (
							<View style={styles.swiperFlatlistChild}>
								<Text style={styles.articleText}>{text}</Text>
							</View>
						)}
					/>
				)}
			</View>
			{article.url && (
				<View style={styles.readMoreButtonContainer}>
					<AppButton
						title="Read More"
						style={{
							backgroundColor: "purple",
						}}
						onPress={openOriginalArticle}
					/>
				</View>
			)}
		</SafeAreaView>
	);
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
	image: {
		height: 300,
		width: "100%",
	},

	heading: {
		fontSize: 17,
		fontWeight: "600",
	},
	articleText: {
		fontSize: 17,
		paddingTop: 5,
		lineHeight: 24,
		// letterSpacing: 0,
		fontFamily: "Roboto-Regular",
		// fontS
		// backgroundColor: "teal",
	},
	brandingContainer: {
		position: "absolute",
		top: 290,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		width: "100%",
		paddingHorizontal: 30,
	},
	branding: {
		backgroundColor: "white",
		borderColor: "purple",
		borderWidth: 1,
		padding: 5,
		paddingHorizontal: 15,
		borderRadius: 10,
	},
	brandingText: { color: "purple", fontWeight: "600" },
	topic: {
		backgroundColor: "purple",
		padding: 5,
		paddingHorizontal: 10,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	swiperFlatlistChild: {
		minHeight: 175,
		width: width - 35,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		maxHeight: 200,
	},
	readMoreButtonContainer: {
		padding: 30,
		marginVertical: 20,
		alignSelf: "center",
		width: 200,
	},
});
