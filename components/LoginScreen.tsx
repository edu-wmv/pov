import React, { useEffect, useRef } from "react";
import { ProView, Text } from "./Themed";
import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View, Keyboard, Animated, EmitterSubscription } from "react-native";
import Logo from "@/assets/svg/title.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar"
import { AntDesign } from "@expo/vector-icons";
import LoginForm from "./LoginForm";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  
  NavigationBar.setPositionAsync("absolute")
  NavigationBar.setBackgroundColorAsync("#DEDEDE")

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
      keyboardVerticalOffset={-insets.top}
    >
    <ImageBackground 
      source={require('@/assets/images/background.png')} 
      style={{ width: '100%', height: '100%' }} 
      resizeMode="cover"
      >
      <ProView 
        style={[styles.container, {backgroundColor: "transparent"}]}
        >
        <View 
          style={[styles.logoContainer, { top: insets.top + 20 }]}
          >
          <Logo width={90*.9} height={35*.9}/>
        </View>
        <View style={styles.mainInfo}>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.description}>Create events, take shots, share your pov</Text>
        </View>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>SHOW YOUR POV</Text>
          <View style={{ width: "100%"}}>
            <LoginForm />
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
          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>Don't have an account? Sign up</Text>
            <Text style={styles.helpText}>Forgot password?</Text>
          </View>
        </View>
      </ProView>
      <StatusBar style="light"backgroundColor="transparent" />
    </ImageBackground>
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
    position: 'absolute'
  },
  mainInfo: {
    alignItems: 'center'
  },
  welcome: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 40
  },
  description: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14
  },
  modalContainer: {
    width: '100%',
    backgroundColor: "#DEDEDE",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    marginTop: 70
  },
  modalTitle: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
    color: "#303030",
    marginBottom: 35
  },
  separatorContainer: {
    marginVertical: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  separator: {
    backgroundColor: "#383838",
    height: 1,
    width: "45%",
  },
  separatorText: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 14,
    color: "#383838",
    marginHorizontal: 10 
  },
  socialContainer: {
    flexDirection: 'row',
    columnGap: 15,
    marginBottom: 5
  },
  socialButton: {
    alignItems: 'center',
    width: 150,
    paddingVertical: 12,
    borderColor: '#ABABAB',
    borderWidth: 1,
    borderRadius: 10
  },
  helpContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 5,
    rowGap: 10
  },
  helpText: {
    color: "#8D8D8D",
    fontFamily: "Montserrat_500Medium",
    fontSize: 12
  }
});