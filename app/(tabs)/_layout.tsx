import FontAwesome from "@expo/vector-icons/FontAwesome";
import {router, Tabs} from "expo-router";
import Head from "expo-router/head";

import axios from "axios";
import {useEffect, useRef} from "react";
import * as Notifications from "expo-notifications";

import {
	OpenSans_300Light,
	OpenSans_300Light_Italic,
	OpenSans_400Regular,
	OpenSans_400Regular_Italic,
	OpenSans_500Medium,
	OpenSans_500Medium_Italic,
	OpenSans_600SemiBold,
	OpenSans_600SemiBold_Italic,
	OpenSans_700Bold,
	OpenSans_700Bold_Italic,
	OpenSans_800ExtraBold,
	OpenSans_800ExtraBold_Italic,
	useFonts,
} from '@expo-google-fonts/open-sans';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function TabLayout() {
	let [fontsLoaded] = useFonts({
		OpenSans_300Light,
		OpenSans_400Regular,
		OpenSans_500Medium,
		OpenSans_600SemiBold,
		OpenSans_700Bold,
		OpenSans_800ExtraBold,
		OpenSans_300Light_Italic,
		OpenSans_400Regular_Italic,
		OpenSans_500Medium_Italic,
		OpenSans_600SemiBold_Italic,
		OpenSans_700Bold_Italic,
		OpenSans_800ExtraBold_Italic,
	});
	// axios.defaults.baseURL = "https://b7fpgqz9cr.ap-south-1.awsapprunner.com";
	axios.defaults.baseURL = "http://192.168.60.23:3000/";
	const responseListener = useRef<Notifications.Subscription>();

	const lastNotificationResponse = Notifications.useLastNotificationResponse();

	useEffect(() => {
		if (lastNotificationResponse && lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER) {
			handlePush(lastNotificationResponse);
		}
	}, [lastNotificationResponse]);

	const handlePush = async ({notification}: Notifications.NotificationResponse) => {
		console.log(notification);
		const notificationData = notification.request.content.data;


		if (notificationData.type === "link") {
			router.push(notificationData.link);
		}
	}

	if (!fontsLoaded) return ""

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
				screenOptions={{
					tabBarActiveTintColor: "purple",
					headerShown: false,
					tabBarStyle: {
						height: 50,
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
