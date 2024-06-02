import React from "react";
import { ProView, Text } from "./Themed";
import { StyleSheet, View } from "react-native";
import Logo from "@/assets/svg/title.svg";

export default function HomeView() {
  return (
    <ProView style={styles.container}>
      <Logo style={styles.logo} width={90*.9} height={35*.9}/>
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
  },
  logo: {
    marginTop: 25
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