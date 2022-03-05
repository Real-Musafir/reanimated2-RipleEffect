import React from "react";
import { View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

function Ripple({ style, onTap, children }) {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const rippleOpacity = useSharedValue(1);

  const aRef = useAnimatedRef();

  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: (tapEvent) => {
      const layout = measure(aRef);

      width.value = layout.width;
      height.value = layout.height;

      centerX.value = tapEvent.x;
      centerY.value = tapEvent.y;

      rippleOpacity.value = 1;
      scale.value = 0;

      scale.value = withTiming(1, { duration: 1000 });
    },
    onActive: () => {
      if (onTap) runOnJS(onTap)();
    },
    onEnd: () => {
      rippleOpacity.value = withTiming(0);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);

    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;
    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      backgroundColor: "rgba(0,0,0,0.2)",
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
    <View ref={aRef} style={style}>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View style={[style, { overflow: "hidden" }]}>
          <View>{children}</View>
          <Animated.View style={rStyle} />
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
}

export default Ripple;
