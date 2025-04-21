import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TaskInterface } from "../index";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const ListItem = ({
  task,
  onDismiss,
  simultaneousHandlers,
}: {
  task: TaskInterface;
  onDismiss: (task: TaskInterface) => void;
  simultaneousHandlers: React.RefObject<any>;
}) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(70);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  task: {
    width: "90%",
    height: 70,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  taskTitle: {
    fontSize: 16,
  },
});

export default ListItem;
