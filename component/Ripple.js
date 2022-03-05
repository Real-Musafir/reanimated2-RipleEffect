import React from "react";
import { View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";

function Ripple({ style, onTap, children }) {
  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: () => {
      if (onTap) runOnJS(onTap)();
    },
    onEnd: () => {},
  });

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = 200;
    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: 0.2,
      backgroundColor: "red",
      position: "absolute",
      transform: [
        {
          scale: 0.5,
        },
      ],
    };
  });

  return (
    <TapGestureHandler onGestureEvent={tapGestureEvent}>
      <Animated.View style={style}>
        <View>{children}</View>
        <Animated.View style={rStyle} />
      </Animated.View>
    </TapGestureHandler>
  );
}

export default Ripple;
