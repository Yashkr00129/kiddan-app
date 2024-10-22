import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Head from "expo-router/head";
import { Platform } from "react-native";
import * as Device from "expo-device";

import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function TabLayout() {
	axios.defaults.baseURL = "https://qqygfatup8.ap-south-1.awsapprunner.com";

	const [expoPushToken, setExpoPushToken] = useState("");
	const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
		[]
	);
	const [notification, setNotification] = useState<
		Notifications.Notification | undefined
	>(undefined);
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();

	useEffect(() => {
		registerForPushNotificationsAsync().then(
			(token) => token && setExpoPushToken(token)
		);

		if (Platform.OS === "android") {
			Notifications.getNotificationChannelsAsync().then((value) =>
				setChannels(value ?? [])
			);
		}
		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			notificationListener.current &&
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			responseListener.current &&
				Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	console.log(expoPushToken);

	return (
		<>
			<Head>
				<title>Kiddaan</title>
				<meta
					name="metro"
					content="<!-- React Native packager is running. -->"
				/>
			</Head>
			<Tabs
				screenOptions={{ tabBarActiveTintColor: "purple", headerShown: false }}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Explore",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={28} name="search" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="article"
					options={{
						title: "Articles",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={28} name="home" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="prefrences"
					options={{
						title: "Prefrences",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={28} name="cog" color={color} />
						),
					}}
				/>
			</Tabs>
		</>
	);
}

async function schedulePushNotification() {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: "You've got mail! 📬",
			body: "Here is the notification body",
			data: { data: "goes here", test: { test1: "more data" } },
		},
		trigger: { seconds: 2 },
	});
}

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}

		try {
			const projectId =
				Constants?.expoConfig?.extra?.eas?.projectId ??
				Constants?.easConfig?.projectId;
			if (!projectId) {
				throw new Error("Project ID not found");
			}
			token = (
				await Notifications.getExpoPushTokenAsync({
					projectId,
				})
			).data;
			console.log(token);
		} catch (e) {
			token = `${e}`;
		}
	} else {
		alert("Must use physical device for Push Notifications");
	}

	alert(token);

	return token;
}
