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
	// axios.defaults.baseURL = "http://192.168.60.24:3000";

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
