import React from "react";
import { Text } from "./Themed";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import RegisterForm from "./RegisterForm";

export default function RegisterModal() {
	return (
		<View style={styles.modalContainer}>
			<Text style={styles.modalTitle}>CREATE YOUR POV</Text>
			<View style={{ width: "100%" }}>
				<RegisterForm />
			</View>
			<View style={styles.separatorContainer}>
				<View style={styles.separator} />
				<Text style={styles.separatorText}>or</Text>
				<View style={styles.separator} />
			</View>
			<View style={styles.socialContainer}>
				<TouchableOpacity style={styles.socialButton} activeOpacity={0.65}>
					<AntDesign name="google" size={24} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.socialButton} activeOpacity={0.65}>
					<AntDesign name="apple1" size={24} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		width: "100%",
		paddingHorizontal: 20,
		paddingTop: 5,
		paddingBottom: 20,
		alignItems: "center",
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
		marginBottom: 30,
	},
	socialButton: {
		alignItems: "center",
		width: 150,
		paddingVertical: 12,
		borderColor: "#ABABAB",
		borderWidth: 1,
		borderRadius: 10,
	}
});
