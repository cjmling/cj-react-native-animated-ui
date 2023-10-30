import React from "react";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, } from "react-native-reanimated";
const CarousalItem = (props) => {
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
    return (React.createElement(Animated.View, { style: [props.itemStyle, itemAnimatedStyle] }, props.children));
};
export default CarousalItem;
