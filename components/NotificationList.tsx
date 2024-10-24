import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationList() {
	const [notifications, setNotifications] = useState<DbNotification[]>([]);

	useEffect(() => {
		const fetchNotifications = async () => {
			const res = await axios.get("/api/notification");
			setNotifications(res.data);
		};
		fetchNotifications();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.heading}>Notifications</Text>
				<Text style={styles.viewButton}>VIEW ALL</Text>
			</View>
			<FlatList
				data={notifications}
				keyExtractor={(item) => item._id}
				renderItem={({ item: notification }) => {
					return (
						<>
							<View style={styles.notificationContainer}>
								<View style={{ flex: 10 }}>
									<Text style={styles.notificationText}>
										{notification.title}
									</Text>
								</View>
								<View style={{ flex: 2 }}>
									<Image
										source={{ uri: notification.article.images[0] }}
										style={{
											width: 60,
											height: 60,
											borderRadius: 10,
										}}
									/>
								</View>
							</View>
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
	},
	notificationText: {
		fontSize: 16,
		paddingTop: 10,
	},
});
