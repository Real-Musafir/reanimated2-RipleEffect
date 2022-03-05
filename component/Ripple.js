import React from "react";
import { View } from "react-native";

function Ripple({ style, onTap, children }) {
  return <View style={style}>{children}</View>;
}

export default Ripple;
