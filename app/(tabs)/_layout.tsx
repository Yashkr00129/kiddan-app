import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Head from "expo-router/head";
import axios from "axios";

export default function TabLayout() {
	axios.defaults.baseURL = "https://qqygfatup8.ap-south-1.awsapprunner.com";
	return (
		<>
			<Head>
				<title>Kiddan</title>
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
