import React from "react";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
const CarousalItem = (props) => {
    const index = props.index;
    const activeIndex = props.activeIndex;
    const itemInactiveOpacity = props.itemInactiveOpacity;
    const itemActiveScale = props.itemActiveScale;
    const activeAnimatedStyle = useAnimatedStyle(() => ({
        zIndex: index === activeIndex ? 2 : 1,
        opacity: withSpring(index === activeIndex ? 1 : itemInactiveOpacity),
        transform: [{ scale: withSpring(index === activeIndex ? itemActiveScale : 1) }],
    }));
    return (React.createElement(Animated.View, { style: [props.itemStyle, activeAnimatedStyle] }, props.children));
};
export default CarousalItem;
