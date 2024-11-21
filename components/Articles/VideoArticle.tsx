import { useVideoPlayer, VideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
	Dimensions,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFocusEffect, usePathname } from "expo-router";
import AppButton from "@/components/ui/AppButton";
import * as WebBrowser from "expo-web-browser";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Octicons from "@expo/vector-icons/Octicons";

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
	const windowWidth = Dimensions.get("screen").width;
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(true);

	const player = useVideoPlayer(videoSource, (player: VideoPlayer) => {
		player.loop = true;
		player.muted = true;
	});

	const { height } = Dimensions.get("window");

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
		if (pathname !== "/article") player.pause();
		else if (index === currentIndex) player.play();
	}, [pathname]);

	useFocusEffect(() => {
		if (index !== currentIndex) {
			player.pause();
		}
		if (index === currentIndex) {
			player.play();
		}
	});

	const openOriginalArticle = async () =>
		await WebBrowser.openBrowserAsync(articleUrl);

	const [muted, setMuted] = useState(true);
	const [showUnmuteIcon, setShowUnmuteIcon] = useState(false);
	const [showMutedIcon, setShowMutedIcon] = useState(false);

	useEffect(() => {
		if (muted) {
			setShowUnmuteIcon(false);
			setShowMutedIcon(true);
			setTimeout(() => {
				setShowMutedIcon(false);
			}, 2000);
		} else {
			setShowMutedIcon(false);
			setShowUnmuteIcon(true);
			setTimeout(() => {
				setShowUnmuteIcon(false);
			}, 2000);
		}
		player.muted = muted;
	}, [muted]);

	return (
		<Pressable
			style={{
				width: "100%",
				position: "relative",
			}}
			onLongPress={() => player.pause()}
			onPress={() => {
				setMuted(!muted);
			}}
			onPressOut={() => player.play()}
		>
			<View
				style={[
					{
						width: "100%",
						height: height - 40,
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
				{(showMutedIcon || showUnmuteIcon) && (
					<View
						style={{
							position: "absolute",
							top: 20,
							backgroundColor: "rgba(255,255,255,0.32)",
							padding: 8,
							paddingHorizontal: 20,
							borderRadius: 10,
						}}
					>
						{showUnmuteIcon && (
							<View style={{ flexDirection: "row", gap: 8 }}>
								<Octicons name="unmute" size={20} color="white" />
								<Text style={{ color: "white" }}>Unmute</Text>
							</View>
						)}
						{showMutedIcon && (
							<View style={{ flexDirection: "row", gap: 8 }}>
								<Octicons name="mute" size={20} color="white" />
								<Text style={{ color: "white" }}>Mute</Text>
							</View>
						)}
					</View>
				)}
				<View style={styles.readMoreButtonContainer}>
					{articleUrl && (
						<AppButton
							title="View more"
							style={{
								backgroundColor: "purple",
							}}
							onPress={openOriginalArticle}
						/>
					)}
				</View>
			</View>
			<VideoView
				ref={videoRef}
				style={{
					width: windowWidth,
					height: height - 40,
					position: "relative",
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
