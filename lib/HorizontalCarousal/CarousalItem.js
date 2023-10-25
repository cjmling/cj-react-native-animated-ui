import React from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
const CarousalItem = (props) => {
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
    return (React.createElement(Animated.View, { style: [props.itemStyle, activeAnimatedStyle, { transform: [{ scale }] }] }, props.children));
};
export default CarousalItem;
