import {
	ActivityIndicator,
	Dimensions,
	Image,
	Modal,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import React, { useState } from "react";

import * as WebBrowser from "expo-web-browser";
import AppText from "@/components/ui/AppText";
import { articleHeight, articleMargin } from "@/constants/styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import * as FileSystem from "expo-file-system";

import Share from "react-native-share";

export default function RegularArticle({
	article,
}: {
	article: ArticleWithPopulatedTopic;
}) {
	const [downloadingShareFile, setDownloadingShareFile] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const openOriginalArticle = async () =>
		await WebBrowser.openBrowserAsync(article.url);

	const openKiddaan = async () => {
		await WebBrowser.openBrowserAsync("http://kiddaan.com");
	};

	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	const handleShare = async (article: ArticleWithPopulatedTopic) => {
		try {
			const filename = article.previewImage.split("/").pop();
			const filepath = `${FileSystem.cacheDirectory}${filename}`;

			setDownloadingShareFile(true);

			await FileSystem.downloadAsync(article.previewImage, filepath);
			const url =
				"https://www.kiddaanapp.com" + "/articles?articleId=" + article._id;

			Share.open({
				url: filepath,
				title: `${url}`,
				message: `${url}`,
			});
		} catch (error) {
			console.error("Error sharing:", error);
		} finally {
			setDownloadingShareFile(false);
		}
	};

	return (
		<Pressable onPress={openModal}>
			{downloadingShareFile && (
				<View
					style={{
						backgroundColor: "black",
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: 10,
						opacity: 0.5,
					}}
				>
					<ActivityIndicator size="large" color="purple" />
				</View>
			)}
			<SafeAreaView
				style={{
					height: articleHeight,
					maxHeight: articleHeight,
					marginBottom: articleMargin,
				}}
			>
				<Modal
					visible={showModal}
					onRequestClose={closeModal}
					transparent={true}
					animationType="fade"
				>
					<View style={styles.otherOptionsContainer}>
						<TouchableOpacity onPress={() => handleShare(article)}>
							<View style={styles.otherOptionsButton}>
								<MaterialCommunityIcons
									name="share-variant"
									size={24}
									color="purple"
								/>
								<Text>Share</Text>
							</View>
						</TouchableOpacity>
						{article.url && (
							<TouchableOpacity onPress={openOriginalArticle}>
								<View style={styles.otherOptionsButton}>
									<MaterialCommunityIcons
										name="more"
										size={24}
										color="purple"
									/>
									<Text>Read More</Text>
								</View>
							</TouchableOpacity>
						)}
					</View>
				</Modal>
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
								style={{
									color: "purple",
									fontSize: 13,
									fontWeight: "semibold",
								}}
							>
								{new Date(article.createdAt).toDateString()}
							</AppText>

							<AppText
								style={{
									color: "purple",
									fontSize: 13,
									fontWeight: "semibold",
								}}
							>
								{new Date(article.createdAt).toLocaleTimeString()}
							</AppText>
						</View>
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
			</SafeAreaView>
		</Pressable>
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
	otherOptionsContainer: {
		height: 70,
		width: "100%",
		position: "absolute",
		bottom: 0,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 20,
	},
	otherOptionsButton: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderWidth: 1,
		borderColor: "purple",
		borderRadius: 10,
		backgroundColor: "white",
		flexDirection: "row",
		gap: 10,
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
