import React from "react";
import { ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface CarousalItemProps {
  itemStyle?: ViewStyle;
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
    <Animated.View style={[props.itemStyle, activeAnimatedStyle, { transform: [{ scale }] }]}>
      {props.children}
    </Animated.View>
  );
};

export default CarousalItem;
