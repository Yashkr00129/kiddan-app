import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Head from "expo-router/head";

export default function TabLayout() {
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
				screenOptions={{ tabBarActiveTintColor: "black", headerShown: false }}
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
