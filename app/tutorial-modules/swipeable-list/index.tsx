import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";
import ListItem from "./components/ListItem";

// 튜토리얼 정보
export const TUTORIAL_INFO = {
  id: "swipeable-list",
  title: "스와이프 가능한 목록",
  description: "왼쪽으로 스와이프하여 삭제하는 목록 구현",
};

const TITLES = [
  "Record the dismissible tutorial 🎥",
  "Leave 👍🏼 to the video",
  "Check YouTube comments",
  "Subscribe to the channel 🚀",
  "Leave a ⭐️ on the GitHub Repo",
];

interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));

const BACKGROUND_COLOR = "#FAFBFF";

export default function SwipeableListTutorial() {
  const [tasks, setTasks] = useState(TASKS);

  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index));
  }, []);

  const scrollRef = useRef(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>{TUTORIAL_INFO.title}</Text>
        <ScrollView ref={scrollRef} style={{ flex: 1 }}>
          {tasks.map((task) => (
            <ListItem simultaneousHandlers={scrollRef} key={task.index} task={task} onDismiss={onDismiss} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: "5%",
  },
});

export type { TaskInterface };
