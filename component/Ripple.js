import React from "react";
import { View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

function Ripple({ style, onTap, children }) {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);

  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: (tapEvent) => {
      centerX.value = tapEvent.x;
      centerY.value = tapEvent.y;
      scale.value = 0;
      scale.value = withTiming(1, { duration: 1000 });
    },
    onActive: () => {
      if (onTap) runOnJS(onTap)();
    },
    onEnd: () => {},
  });

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = 200;
    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;
    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: 0.2,
      backgroundColor: "red",
      position: "absolute",
      top: 0,
      left: 0,
      transform: [
        { translateX },
        { translateY },
        {
          scale: scale.value,
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
