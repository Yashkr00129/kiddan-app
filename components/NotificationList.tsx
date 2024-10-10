import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const notifications = [
	{
		text: "Rafael Nadal retires from tennis aged 38",
		href: "https://images.unsplash.com/photo-1530915365347-e35b749a0381?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		text: "Harry Brook smashes second-fastest triple hundred in Test cricket history",
		href: "https://plus.unsplash.com/premium_photo-1679917506585-2c7b89054610?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		text: "Rafael Nadal retires from tennis aged 38",
		href: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

export default function NotificationList() {
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Notifications</Text>
			{notifications.map((notification, index) => (
				<>
					<View style={styles.notificationContainer}>
						<View style={{ flex: 10 }}>
							<Text style={styles.notificationText}>{notification.text}</Text>
						</View>
						<View style={{ flex: 2 }}>
							<Image
								source={{ uri: notification.href }}
								style={{
									width: 60,
									height: 60,
									borderRadius: 100,
								}}
							/>
						</View>
					</View>
				</>
			))}
			<Button color={"black"} title="View All" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		paddingBottom: 50,
	},
	heading: {
		fontSize: 20,
		fontWeight: "bold",
		paddingTop: 20,
		paddingBottom: 10,
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
