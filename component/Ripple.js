import React from "react";
import { View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler } from "react-native-reanimated";

function Ripple({ style, onTap, children }) {
  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: () => {
      console.log("tap");
    },
    onEnd: () => {},
  });

  return (
    <TapGestureHandler onGestureEvent={tapGestureEvent}>
      <Animated.View>
        <View style={style}>{children}</View>
      </Animated.View>
    </TapGestureHandler>
  );
}

export default Ripple;
