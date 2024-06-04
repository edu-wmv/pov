import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { ProView, Text } from "./Themed";
import {
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
	Keyboard,
	Animated,
	type EmitterSubscription,
	Button,
} from "react-native";
import Logo from "@/assets/svg/title.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { AntDesign } from "@expo/vector-icons";
import LoginForm from "./LoginForm";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoginModal from "./LoginModal";

export default function MainScreen() {
	const insets = useSafeAreaInsets();
	const infoOpacity = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		const keyboardShowListener: EmitterSubscription = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				Animated.timing(infoOpacity, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}).start();
			},
		);
		const keyboardHideListener: EmitterSubscription = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				Animated.timing(infoOpacity, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}).start();
			},
		);

		return () => {
			keyboardShowListener.remove();
			keyboardHideListener.remove();
		};
	}, [infoOpacity]);

	Platform.OS === "android" &&
		useEffect(() => {
			NavigationBar.setPositionAsync("absolute");
			NavigationBar.setBackgroundColorAsync("#DEDEDE");
		});

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
			keyboardVerticalOffset={-insets.top}
		>
			<GestureHandlerRootView>
				<ImageBackground
					source={require("@/assets/images/background.png")}
					style={{ width: "100%", height: "100%" }}
					resizeMode="cover"
				>
					<ProView
						style={[styles.container, { backgroundColor: "transparent" }]}
					>
						<View style={[styles.logoContainer, { top: insets.top + 20 }]}>
							<Logo width={90 * 0.9} height={35 * 0.9} />
						</View>
						<Animated.View style={[styles.mainInfo, { opacity: infoOpacity }]}>
							<Text style={styles.welcome}>Welcome</Text>
							<Text style={styles.description}>
								Create events, take shots, share your pov
							</Text>
						</Animated.View>

						<BottomSheetModalProvider>
              <LoginModal />
            </BottomSheetModalProvider>
					</ProView>
					<StatusBar style="light" backgroundColor="transparent" />
				</ImageBackground>
			</GestureHandlerRootView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	logoContainer: {
		position: "absolute",
	},
	mainInfo: {
		alignItems: "center",
	},
	welcome: {
		fontFamily: "Montserrat_700Bold",
		fontSize: 40,
	},
	description: {
		fontFamily: "Montserrat_400Regular",
		fontSize: 14,
	},
	modalContainer: {
		width: "100%",
		backgroundColor: "#DEDEDE",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		padding: 20,
		alignItems: "center",
		marginTop: 70,
	},
	modalTitle: {
		fontFamily: "Montserrat_600SemiBold",
		fontSize: 14,
		color: "#303030",
		marginBottom: 35,
	},
	separatorContainer: {
		marginVertical: 25,
		flexDirection: "row",
		alignItems: "center",
	},
	separator: {
		backgroundColor: "#383838",
		height: 1,
		width: "45%",
	},
	separatorText: {
		fontFamily: "Montserrat_700Bold",
		fontSize: 14,
		color: "#383838",
		marginHorizontal: 10,
	},
	socialContainer: {
		flexDirection: "row",
		columnGap: 15,
		marginBottom: 5,
	},
	socialButton: {
		alignItems: "center",
		width: 150,
		paddingVertical: 12,
		borderColor: "#ABABAB",
		borderWidth: 1,
		borderRadius: 10,
	},
	helpContainer: {
		alignItems: "center",
		marginTop: 35,
		marginBottom: 10,
		rowGap: 10,
	},
	helpText: {
		color: "#8D8D8D",
		fontFamily: "Montserrat_500Medium",
		fontSize: 12,
	},
});
