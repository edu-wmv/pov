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
} from "react-native";
import Logo from "@/assets/svg/title.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function MainScreen() {
	const insets = useSafeAreaInsets();
	const infoTop = useRef(new Animated.Value(0)).current;
	const loginSnapPoints = useMemo(() => ["25%", "60%"], []);
  const registerSnapPoints = useMemo(() => ["25%", "70%"], []);
	const LoginModalRef = useRef<BottomSheetModal>(null);
	const RegisterModalRef = useRef<BottomSheetModal>(null);

	const infoTopPercentage = infoTop.interpolate({
		inputRange: [0, 1],
		outputRange: ["45%", "15%"],
	});

  const handleInfoTop15 = useCallback(() => {
    Animated.timing(infoTop, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [infoTop]);

	const handleInfoTop45 = useCallback(() => {
		Animated.timing(infoTop, {
			toValue: 0,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [infoTop]);

	const handleLoginModal = useCallback(() => {
		handleInfoTop15();
		LoginModalRef.current?.present();
	}, [handleInfoTop15]);

	const handleRegisterModal = useCallback(() => {
		handleInfoTop15();
		RegisterModalRef.current?.present();
	}, [handleInfoTop15]);

	useEffect(() => {
		const keyboardShowListener: EmitterSubscription = Keyboard.addListener(
			"keyboardDidShow", handleInfoTop15,
		);
		const keyboardHideListener: EmitterSubscription = Keyboard.addListener(
			"keyboardDidHide", handleInfoTop15,
		);

		return () => {
			keyboardShowListener.remove();
			keyboardHideListener.remove();
		};
	}, [handleInfoTop15]);

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
					<ProView style={[styles.container, { marginTop: insets.top + 20 }]}>
						<View style={styles.logoContainer}>
							<Logo width={90 * 0.9} height={35 * 0.9} />
						</View>
						<Animated.View
							style={[styles.mainInfo, { top: infoTopPercentage }]}
						>
							<Text style={styles.welcome}>Welcome</Text>
							<Text style={styles.description}>
								Create events, take shots, share your pov
							</Text>
						</Animated.View>

						<View style={styles.buttonContainer}>
							<TouchableOpacity
								onPress={handleLoginModal}
								style={styles.loginButton}
							>
								<Text style={styles.loginButtonText}>Login</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={handleRegisterModal}
								style={styles.registerButton}
							>
								<Text style={styles.registerButtonText}>Register</Text>
							</TouchableOpacity>
						</View>

						<BottomSheetModalProvider>
							{/* LOGIN MODAL */}
							<BottomSheetModal
								ref={LoginModalRef}
								index={1}
								snapPoints={loginSnapPoints}
								onDismiss={handleInfoTop45}
								enableDismissOnClose
								enableDynamicSizing
								handleIndicatorStyle={{
									backgroundColor: "#D9D9D9",
									width: "25%",
									height: 5,
								}}
								handleStyle={{ transform: [{ translateY: -30 }] }}
								backgroundStyle={{ backgroundColor: "#DEDEDE" }}
							>
								<BottomSheetView>
									<LoginModal />
								</BottomSheetView>
							</BottomSheetModal>

							{/* REGISTER MODAL */}
							<BottomSheetModal
								ref={RegisterModalRef}
								index={1}
								snapPoints={registerSnapPoints}
								onDismiss={handleInfoTop45}
								enableDismissOnClose
								enableDynamicSizing
								handleIndicatorStyle={{
									backgroundColor: "#D9D9D9",
									width: "25%",
									height: 5,
								}}
								handleStyle={{ transform: [{ translateY: -30 }] }}
								backgroundStyle={{ backgroundColor: "#DEDEDE" }}
							>
								<BottomSheetView>
									<RegisterModal />
								</BottomSheetView>
							</BottomSheetModal>
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
		justifyContent: "center",
		backgroundColor: "transparent",
	},
	logoContainer: {
		position: "absolute",
		top: 0,
	},
	mainInfo: {
		alignItems: "center",
		position: "absolute",
		top: 200,
	},
	welcome: {
		fontFamily: "Montserrat_700Bold",
		fontSize: 40,
	},
	description: {
		fontFamily: "Montserrat_400Regular",
		fontSize: 14,
	},
	buttonContainer: {
		position: "absolute",
		bottom: 0,
		alignItems: "center",
		marginBottom: 40,
		width: "100%",
		paddingHorizontal: 30,
	},
	loginButton: {
		backgroundColor: "#DEDEDE",
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginTop: 20,
		width: "100%",
		alignItems: "center",
	},
	loginButtonText: {
		fontFamily: "Montserrat_700Bold",
		fontSize: 16,
		color: "#303030",
	},
	registerButton: {
		backgroundColor: "#303030",
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginTop: 10,
		width: "100%",
		alignItems: "center",
	},
	registerButtonText: {
		fontFamily: "Montserrat_700Bold",
		fontSize: 16,
		color: "#DEDEDE",
	},
});
