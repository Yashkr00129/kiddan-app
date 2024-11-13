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
import {
	splitByCharacterCount,
	splitByWordCount,
} from "../../utils/splitByWordCount";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RegularArticle({
	article,
}: {
	article: ArticleWithPopulatedTopic;
}) {
	const windowHeight = Dimensions.get("window").height;

	const descriptionList = splitByWordCount(article.description, 70);

	if (article.title.startsWith("")) {
	}

	const openOriginalArticle = async () =>
		await WebBrowser.openBrowserAsync(article.url);

	const openKiddaan = async () => {
		await WebBrowser.openBrowserAsync("http://kiddaan.com");
	};
	const { top, bottom } = useSafeAreaInsets();

	return (
		<SafeAreaView
			style={{
				width: "100%",
				height: windowHeight - top - bottom,
				// maxHeight: windowHeight - top - bottom,
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

			<View style={{ padding: 20 }}>
				{/*<View style={styles.controls}>*/}
				{/*	<View style={styles.topic}>*/}
				{/*		<Text style={{ color: "white" }}>*/}
				{/*			{" "}*/}
				{/*			{article.topics[0]?.title || ""}*/}
				{/*		</Text>*/}
				{/*	</View>*/}

				{/*</View>*/}
				<View style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}>
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
				<Text style={styles.heading}>{article.title}</Text>
				{descriptionList.length === 1 ? (
					<Text style={styles.articleText}>{descriptionList[0]}</Text>
				) : (
					<SwiperFlatList
						// index={1}
						showPagination
						paginationStyleItem={{ width: 10, height: 10, marginTop: 30 }}
						paginationStyleItemActive={{ backgroundColor: "purple" }}
						data={descriptionList}
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
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
	controls: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	controlGroup: {
		flexDirection: "row",
		gap: 10,
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
		top: 310,
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

		marginVertical: "auto",
		alignSelf: "center",
		width: 200,
	},
});
