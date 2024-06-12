import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, type FieldErrors, useForm } from "react-hook-form";
import Host from "@/constants/Host";


const schema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters long" })
		.max(20, { message: "Username must be at most 20 characters long" })
		.regex(/^[a-zA-Z0-9_]+$/, {
			message: "Username must contain only letters, numbers, and underscores",
		}),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" })
		.regex(/[A-Z]/, {
			message: "Password must contain at least one uppercase letter",
		})
		.regex(/[a-z]/, {
			message: "Password must contain at least one lowercase letter",
		})
		.regex(/[0-9]/, { message: "Password must contain at least one number" })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Password must contain at least one special character",
		}),
	confirmPassword: z
		.string()
		.min(8)
}).superRefine(( { password, confirmPassword }, ctx) => {
	if (password !== confirmPassword) {
		ctx.addIssue({
			code: "custom",
			message: "Passwords do not match",
			path: ["confirmPassword"],
		});
	}
})


const RegisterForm = () => {
	const [loading, setLoading] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		resolver: zodResolver(schema),
	});

	
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const onSubmit = async (data: any) => {
		setLoading(true);
		console.log(data);

		try {
			const response = await fetch(`${Host.API}/v1/user/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			// console.log(response)

			if (response.status === 201) {
				reset();
				Alert.alert("Account created", "You can now log in");
			} else if (response.status === 409) {
				Alert.alert("Account already exists", "Please log in");
			} else {
				Alert.alert("Failed to create account", "Please try again later");
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
				Object.values(errors).map((error) => error?.message).join("\n• ")
			);
		}
	}

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
								borderColor: errors.username ? "#FF0000" : "#929292",
							}}
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
							value={value}
							placeholder={
								errors.username ? String(errors.username.message) : "Username"
							}
							placeholderTextColor={
								errors.username ? "rgba(255, 0, 0, 0.6)" : "#A5A5A5"
							}
						/>
					</View>
				)}
				name="username"
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
								errors.confirmPassword
									? String(errors.confirmPassword.message)
									: "Confirm Password"
							}
							placeholderTextColor={
								errors.confirmPassword ? "rgba(255, 0, 0, 0.6)" : "#A5A5A5"
							}
							secureTextEntry
						/>
					</View>
				)}
				name="confirmPassword"
				defaultValue=""
			/>

			{
				loading 
				? ( <ActivityIndicator size="large" color="#343434" /> ) 
				: (	
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={handleSubmit(onSubmit, onError)}
					>
						<Text style={styles.buttonText}>Create an account</Text>
					</TouchableOpacity>
				)
			}
		</View>
	);
};

export default RegisterForm;

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
