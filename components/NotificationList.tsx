import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import { splitByWordCount } from "@/utils/splitByWordCount";

export default function NotificationList({
	limit,
	disableRedirect = false,
}: {
	limit?: number;
	disableRedirect?: boolean;
}) {
	const router = useRouter();
	const [notifications, setNotifications] = useState<DbNotification[]>([]);

	useEffect(() => {
		const fetchNotifications = async () => {
			let apiUrl = "/api/notification";
			if (limit) apiUrl = apiUrl + `?limit=${limit}`;

			const res = await axios.get(apiUrl);
			setNotifications(res.data);
		};
		fetchNotifications();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.heading}>Latest</Text>
				{!disableRedirect && (
					<Text
						style={styles.viewButton}
						onPress={() => router.push("/notification")}
					>
						VIEW ALL
					</Text>
				)}
			</View>
			<FlatList
				data={notifications}
				keyExtractor={(item) => item._id}
				renderItem={({ item: notification }) => {
					return (
						<>
							<TouchableOpacity
								onPress={() =>
									router.push(`/article?articleId=${notification.article._id}`)
								}
							>
								<View style={styles.notificationContainer}>
									<View style={{ flex: 10 }}>
										<Text style={styles.notificationText}>
											{truncateStringByWord(notification.title, 70)}
										</Text>
									</View>
									<View style={{ flex: 2 }}>
										<Image
											source={{
												uri:
													notification.article.images[0] ||
													"https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
											}}
											style={{
												width: 60,
												height: 60,
												borderRadius: 10,
											}}
										/>
									</View>
								</View>
							</TouchableOpacity>
						</>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		paddingBottom: 50,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	heading: {
		fontSize: 20,
		fontWeight: "500",
		paddingTop: 20,
		paddingBottom: 10,
	},
	viewButton: {
		fontSize: 14,
		fontWeight: "bold",
		paddingTop: 20,
		paddingBottom: 10,
		color: "purple",
	},
	notificationContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginBottom: 10,
		marginRight: 10,
		flex: 1,
		gap: 10,
	},
	notificationText: {
		fontSize: 16,
		paddingTop: 10,
	},
});

function truncateStringByWord(text: string, maxLength: number): string {
	const words = text.split(" ");
	const truncatedWords = [];
	let currentLength = 0;

	for (const word of words) {
		if (currentLength + word.length > maxLength) {
			break;
		}
		truncatedWords.push(word);
		currentLength += word.length + 1; // Add 1 for the space
	}

	let truncatedText = truncatedWords.join(" ");
	if (text.length > maxLength) {
		truncatedText += "...";
	}

	return truncatedText;
}
