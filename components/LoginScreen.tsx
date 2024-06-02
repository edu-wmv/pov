import React from "react";
import { ProView, Text } from "./Themed";
import { StyleSheet, View } from "react-native";
import Logo from "@/assets/svg/title.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ProView style={styles.container}>
      <View style={[styles.logoContainer, { top: insets.top + 20 }]}>
        <Logo width={90*.9} height={35*.9}/>
      </View>
      <View style={styles.mainInfo}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.description}>Create events, take shots, share your pov</Text>
      </View>
      <View>
        {/* login form modal */}
      </View>
    </ProView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 5
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
  }
});