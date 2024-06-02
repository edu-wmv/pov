import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import DefaultTheme from "@/components/DefaultTheme"

import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	initialRouteName: "home",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
      // new Promise(resolve => setTimeout(resolve, 3000))
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

const defaultOptions: NativeStackNavigationOptions = {
	headerShown: false,
};

function RootLayoutNav() {
	const colorScheme = DefaultTheme;

	return (
		<ThemeProvider value={colorScheme}>
			<Stack>
				<Stack.Screen name="home" options={{ ...defaultOptions }} />
			</Stack>
		</ThemeProvider>
	);
}
