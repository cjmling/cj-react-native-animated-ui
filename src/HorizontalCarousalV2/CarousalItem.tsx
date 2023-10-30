import React from "react";
import { ViewStyle } from "react-native";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface Props {
  children: React.ReactNode;
  index: number;
  translateX: SharedValue<number>;
  offsetWidth: number;
  itemStyle?: ViewStyle;
}

const CarousalItem = (props: Props) => {
  const inputRange = [
    (-props.index - 1) * props.offsetWidth,
    -props.index * props.offsetWidth,
    (-props.index + 1) * props.offsetWidth,
  ];

  const itemAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(props.translateX.value, inputRange, [1, 1.2, 1], Extrapolate.CLAMP);

    return {
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[props.itemStyle, itemAnimatedStyle]}>{props.children}</Animated.View>
  );
};

export default CarousalItem;
