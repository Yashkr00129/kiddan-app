import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { usePathname } from "expo-router";
import AppButton from "@/components/ui/AppButton";
import * as WebBrowser from "expo-web-browser";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function VideoArticle({
	videoSource,
	index,
	currentIndex,
	articleUrl = "",
}: {
	videoSource: string;
	index: number;
	currentIndex: number;
	articleUrl?: string;
}) {
	const pathname = usePathname();
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(true);
	const player = useVideoPlayer(videoSource, (player: any) => {
		player.loop = true;
		if (index === currentIndex) player.play();
	});

	const videoArticlePathname = "/article";

	const { bottom, top } = useSafeAreaInsets();

	useEffect(() => {
		const subscription = player.addListener(
			"playingChange",
			(isPlaying: boolean) => {
				setIsPlaying(isPlaying);
			}
		);

		return () => {
			subscription.remove();
		};
	}, [player]);

	useEffect(() => {
		if (pathname !== videoArticlePathname) {
			player.pause();
		} else {
			if (index === currentIndex) player.play();
		}
	}, [pathname]);

	useEffect(() => {
		if (index === currentIndex) player.play();
		else player.pause();
	}, [currentIndex]);

	const openOriginalArticle = async () =>
		await WebBrowser.openBrowserAsync(articleUrl);

	return (
		<Pressable
			style={{ width: "100%", height: "100%" }}
			onLongPress={() => player.pause()}
			onPressOut={() => player.play()}
		>
			<View
				style={[
					{
						width: windowWidth,
						height: windowHeight - top - bottom,
						maxHeight: windowHeight - top - bottom,
						zIndex: 10,
						position: "absolute",
						top: 0,
						justifyContent: "center",
						alignItems: "center",
					},
					!isPlaying && {
						backgroundColor: "#0000005d",
					},
				]}
			>
				{!isPlaying && (
					<MaterialCommunityIcons name="play" size={80} color="white" />
				)}
				{articleUrl && (
					<View style={styles.readMoreButtonContainer}>
						<AppButton
							title="View more"
							style={{
								backgroundColor: "purple",
							}}
							onPress={openOriginalArticle}
						/>
					</View>
				)}
			</View>
			<VideoView
				ref={videoRef}
				style={{
					width: windowWidth,
					height: windowHeight - top - bottom,
				}}
				contentFit="cover"
				player={player}
				allowsFullscreen={false}
				allowsPictureInPicture={false}
				nativeControls={false}
			/>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	controlsContainer: {
		padding: 10,
	},
	readMoreButtonContainer: {
		position: "absolute",
		bottom: 0,
		padding: 20,
		margin: "auto",
		alignSelf: "center",
		width: 200,
		zIndex: 20,
	},
});
