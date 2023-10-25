import React from "react";
import { TouchableOpacity } from "react-native";
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
    return (React.createElement(Animated.View, { style: [
            {
                width: props.itemWidth,
                height: 100,
                borderWidth: 1,
                borderColor: "red",
                opacity: 0.4,
            },
            activeAnimatedStyle,
            { transform: [{ scale }] },
        ] },
        React.createElement(TouchableOpacity, { style: { height: "100%" } }, props.children)));
};
export default CarousalItem;
