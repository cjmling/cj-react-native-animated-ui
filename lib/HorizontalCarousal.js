import React, { Children, useState } from "react";
import { Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import CarousalItem from "./CarousalItem";
export default function HorizontalCarousal(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const itemWidth = props.itemWidth || 50;
    const itemGap = props.itemGap || 10;
    const pressed = useSharedValue(false);
    const offset = useSharedValue(0);
    const sharedActiveIndex = useSharedValue(0);
    const calculateNewOffset = (index) => {
        return -index * 110;
    };
    const pan = Gesture.Pan()
        .onBegin(() => {
        pressed.value = true;
    })
        .onChange((event) => {
        offset.value += event.changeX;
    })
        .onFinalize((event) => {
        // If slide to the left = negative value
        if (event.translationX < 0) {
            // If slide passes half of item width
            if (event.translationX * -1 > itemWidth / 2) {
                sharedActiveIndex.value += 1;
            }
        }
        else if (event.translationX > 0) {
            // If slide passes half of item width
            if (event.translationX > itemWidth / 2) {
                sharedActiveIndex.value -= 1;
            }
        }
        const tempNewOffset = calculateNewOffset(sharedActiveIndex.value);
        setActiveIndex(sharedActiveIndex.value);
        offset.value = withTiming(tempNewOffset);
        pressed.value = false;
    });
    const wrapperAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                // translateX: withTiming(translateX.value),
                translateX: offset.value,
            },
        ],
    }));
    return (React.createElement(GestureDetector, { gesture: pan },
        React.createElement(Animated.View, { style: [
                {
                    display: "flex",
                    flexDirection: "row",
                    gap: itemGap,
                    justifyContent: "flex-start",
                    width: (itemWidth + itemGap) * Children.count(props.children), // We need to set this otherwise its not scrollable
                },
                props.wrapperStyle,
                wrapperAnimatedStyle,
            ] }, props.children.map((children, index) => (React.createElement(CarousalItem, { itemWidth: itemWidth, index: index, activeIndex: activeIndex },
            React.createElement(Text, { style: { color: "red" } },
                offset.value,
                " , ",
                index),
            children))))));
}
