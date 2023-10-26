import React from "react";
import { ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";

interface CarousalItemProps {
  itemStyle?: ViewStyle;
  index: number;
  activeIndex: number;
  children: React.ReactNode;
  itemWidth: number;
  itemInactiveOpacity: number;
  itemActiveScale: number;
}

const CarousalItem = (props: CarousalItemProps) => {
  const index = props.index;
  const activeIndex = props.activeIndex;
  const itemInactiveOpacity = props.itemInactiveOpacity;
  const itemActiveScale = props.itemActiveScale;

  const activeAnimatedStyle = useAnimatedStyle(() => ({
    zIndex: index === activeIndex ? 2 : 1,
    opacity: withSpring(index === activeIndex ? 1 : itemInactiveOpacity),
    transform: [{ scale: withSpring(index === activeIndex ? itemActiveScale : 1) }],
  }));

  return (
    <Animated.View style={[props.itemStyle, activeAnimatedStyle]}>{props.children}</Animated.View>
  );
};

export default CarousalItem;
