import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Switch, Platform } from "react-native";

import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import axios from "axios";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function PrefrencesPage() {
	const [enableNotifications, setNotificationsEnabled] = useState(false);
	const [disabled, setDisabled] = useState(false);

	// enableNotifications should be set to true in a useEffect if the user has already enabled notifications

	async function handlePushNotificationRegistration() {
		let token = await getExistingPushToken();
		console.log(token);

		setDisabled(true);

		if (!enableNotifications) {
			if (Platform.OS === "android") {
				await Notifications.setNotificationChannelAsync("default", {
					name: "default",
					importance: Notifications.AndroidImportance.MAX,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: "#FF231F7C",
				});
			}

			if (!Device.isDevice)
				return alert("Must use physical device for Push Notifications");

			const { status: existingStatus, canAskAgain } =
				await Notifications.getPermissionsAsync();

			let finalStatus = existingStatus;
			console.log(canAskAgain);

			if (existingStatus !== "granted") {
				const { status, canAskAgain } =
					await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				setNotificationsEnabled(false);
			}

			await axios.post("/api/notification/add-push-token", { token });
			setNotificationsEnabled(true);
		} else {
			await Notifications.unregisterForNotificationsAsync();

			await axios.post("/api/notification/remove-push-token", { token });
			setNotificationsEnabled(false);
		}

		setDisabled(false);
	}

	useLayoutEffect(() => {
		const refetch = async () => {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			if (existingStatus == "granted") {
				setNotificationsEnabled(true);
			} else {
				setNotificationsEnabled(false);
			}
		};
		refetch();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={[styles.heading, { marginBottom: 10 }]}>Prefrences</Text>
			<View
				style={{
					alignItems: "center",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<View>
					<Text style={styles.subHeading}>Notifications</Text>
					<Text style={styles.textContent}>Manage your alerts</Text>
				</View>
				<Switch
					disabled={disabled}
					trackColor={{ false: "#767577", true: "#7675776b" }}
					thumbColor={enableNotifications ? "purple" : "#f4f3f4"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={handlePushNotificationRegistration}
					value={enableNotifications}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	heading: {
		fontSize: 35,
		fontWeight: "500",
	},
	subHeading: {
		fontSize: 25,
	},
	textContent: {
		fontSize: 16,
		color: "#00000085",
	},
});

const getExistingPushToken = async () => {
	try {
		const projectId =
			Constants?.expoConfig?.extra?.eas?.projectId ??
			Constants?.easConfig?.projectId;

		if (!projectId) throw new Error("Project ID not found");

		let token = (
			await Notifications.getExpoPushTokenAsync({
				projectId,
			})
		).data;
		return token;
	} catch (error) {
		return "";
	}
};
