import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from 'react-hook-form'

const schema = z.object({
  email: z.string()
    .email({ message: "Invalid email" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
})

const LoginForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: any) => console.log(JSON.stringify(data));

  return (
    <View style={{ }}>
      <Controller 
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Email"
              placeholderTextColor="#A5A5A5"
            />
            {errors.email && <Text style={styles.errorText}>{String(errors.email.message)}</Text>}
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
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Password"
              placeholderTextColor="#A5A5A5"
              secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{String(errors.password.message)}</Text>}
          </View>
        )}
        name="password"
        defaultValue=""
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  textInput: {
    width: "100%",
    padding: 10,
    borderColor: "#929292",
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
  }
})