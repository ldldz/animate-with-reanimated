import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import SwipeableListTutorial from "@/app/tutorial-modules/swipeable-list";

const ACTIVE_TUTORIAL = SwipeableListTutorial;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ACTIVE_TUTORIAL />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFBFF",
  },
});
