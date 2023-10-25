import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface CarousalItemProps {
  style?: StyleProp<ViewStyle>;
  index: number;
  activeIndex: number;
  children: React.ReactNode;
  itemWidth: number;
}

const CarousalItem = (props: CarousalItemProps) => {
  const scale = useSharedValue(1);

  const isActive = () => {
    if (props.index === props.activeIndex) {
      return true;
    }

    return false;
  };

  const activeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withSpring(isActive() ? 1 : 0.5),
    transform: [{ scale: withSpring(isActive() ? 1.2 : 1) }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: props.itemWidth,
          height: 100,
          borderWidth: 1,
          borderColor: "red",
          opacity: 0.4,
        },
        activeAnimatedStyle,
        { transform: [{ scale }] },
      ]}
    >
      <TouchableOpacity style={{ height: "100%" }}>{props.children}</TouchableOpacity>
    </Animated.View>
  );
};

export default CarousalItem;
