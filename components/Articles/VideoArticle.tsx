import { useVideoPlayer, VideoPlayer, VideoView } from "expo-video";
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
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
import { articleHeight, articleMargin, tabBarHeight } from "@/constants/styles";

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
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(true);

	const player = useVideoPlayer(videoSource, (player: VideoPlayer) => {
		player.loop = true;
		player.muted = true;
	});

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

	const handlePause = (input?: string) => {
		player.pause();
	};

	const handlePlay = (input?: string) => {
		console.log("Playing due to", input);
		if (index !== currentIndex) return;
		console.log("Index and current index while playing", index, currentIndex);
		player.play();
	};

	useEffect(() => {
		if (pathname !== "/articles") handlePause();
		else if (index === currentIndex)
			handlePlay("useEffect that checks the pathname");
	}, [pathname]);

	useEffect(() => {
		if (index !== currentIndex) handlePause();
		if (index === currentIndex) handlePlay("use effect that checks the index");
	}, [index, currentIndex]);

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
			onLongPress={() => handlePause("longpress")}
			onPress={() => {
				setMuted(!muted);
			}}
		>
			<View
				style={[
					{
						width: "100%",
						height: articleHeight,
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
					<Pressable
						onPress={() => {
							console.log("pressed play button");
							handlePlay();
						}}
					>
						<MaterialCommunityIcons name="play" size={80} color="white" />
					</Pressable>
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
					width: "100%",
					height: articleHeight,
					marginBottom: articleMargin,
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
