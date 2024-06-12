import {
	ActivityIndicator,
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, type FieldErrors, useForm } from "react-hook-form";
import Host from "@/constants/Host";

const schema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(8, { message: "Invalid password" }),
});

const LoginForm = () => {
	const [loading, setLoading] = React.useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const onSubmit = async (data: any) => {
		console.log(data);
		setLoading(true);

		try {
			const response = await fetch(`${Host.AUTH}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			console.log(await response.json());

			switch (response.status) {
				case 200:
					Alert.alert("Logged in", "Welcome back");
					break;
				case 401:
					Alert.alert("Invalid credentials", "Please try again");
					break;
				case 404:
					Alert.alert("Account not found", "Please sign up");
					break;
				default:
					Alert.alert("Failed to log in", "Please try again later");
					break;
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const onError = (errors: FieldErrors) => {
		if (Object.keys(errors).length > 0) {
			Alert.alert(
				"Invalid form data",
				Object.values(errors).map((error) => error?.message).join("\n")
			)
		}
	};

	return (
		<View style={{}}>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<View style={styles.inputContainer}>
						<TextInput
							style={{
								...styles.textInput,
								borderColor: errors.email ? "#FF0000" : "#929292",
							}}
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
							value={value}
							placeholder={
								errors.email ? String(errors.email.message) : "Email"
							}
							placeholderTextColor={
								errors.email ? "rgba(255, 0, 0, 0.6)" : "#A5A5A5"
							}
						/>
					</View>
				)}
				name="email"
				defaultValue=""
			/>

			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<View style={styles.inputContainer}>
						<TextInput
							style={{
								...styles.textInput,
								borderColor: errors.password ? "#FF0000" : "#929292",
							}}
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
							value={value}
							placeholder={
								errors.password ? String(errors.password.message) : "Password"
							}
							placeholderTextColor={
								errors.password ? "rgba(255, 0, 0, 0.6)" : "#A5A5A5"
							}
							secureTextEntry
						/>
					</View>
				)}
				name="password"
				defaultValue=""
			/>

			{
				loading
					? <ActivityIndicator />
					: <TouchableOpacity
						style={styles.buttonContainer}
						onPress={handleSubmit(onSubmit, onError)}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
			}
		</View>
	);
};

export default LoginForm;

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
		marginBottom: 20,
	},
	textInput: {
		width: "100%",
		height: 50,
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
	},
	buttonContainer: {
		backgroundColor: "#343434",
		width: "100%",
		borderRadius: 10,
		paddingVertical: 15,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontFamily: "Montserrat_700Bold",
	},
	errorText: {
		color: "#FF0000",
		fontFamily: "Montserrat_400Regular",
		fontSize: 12,
		marginTop: 4,
	},
});
