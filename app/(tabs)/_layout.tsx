import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, Tabs } from "expo-router";
import Head from "expo-router/head";

import axios from "axios";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function TabLayout() {
	axios.defaults.baseURL = "https://b7fpgqz9cr.ap-south-1.awsapprunner.com";
	// axios.defaults.baseURL = "http://192.168.60.23:3000/";

	const lastNotificationResponse = Notifications.useLastNotificationResponse();

	useEffect(() => {
		if (
			lastNotificationResponse &&
			lastNotificationResponse.actionIdentifier ===
				Notifications.DEFAULT_ACTION_IDENTIFIER
		) {
			handlePush(lastNotificationResponse);
		}
	}, [lastNotificationResponse]);

	const handlePush = async ({
		notification,
	}: Notifications.NotificationResponse) => {
		const notificationData = notification.request.content.data;

		if (notificationData.type === "link") {
			router.push(notificationData.link);
		}
	};

	return (
		<>
			<GestureHandlerRootView>
				<Head>
					<title>Kiddaan</title>
					<meta
						name="metro"
						content="<!-- React Native packager is running. -->"
					/>
				</Head>
				<Tabs
					screenOptions={{
						tabBarActiveTintColor: "purple",
						headerShown: false,
						tabBarStyle: {
							height: 40,
						},
					}}
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
							title: "Home",
							tabBarIcon: ({ color }) => (
								<Pressable onPress={() => router.replace("/article")}>
									<FontAwesome size={28} name="home" color={color} />
								</Pressable>
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
			</GestureHandlerRootView>
		</>
	);
}
