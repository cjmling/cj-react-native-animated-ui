import React, { Children, useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import CarousalItem from "./CarousalItem";
export default function HorizontalCarousal(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const itemWidth = props.itemWidth || 50;
    const itemGap = props.itemGap || 10;
    const offset = useSharedValue(0);
    const sharedActiveIndex = useSharedValue(0);
    const calculateNewOffset = (index) => {
        return -index * (itemWidth + itemGap);
    };
    const pan = Gesture.Pan()
        .onBegin(() => { })
        .onChange((event) => {
        offset.value += event.changeX;
    })
        .onFinalize((event) => {
        // If slide to the left = negative value
        if (event.translationX < 0 && sharedActiveIndex.value < Children.count(props.children) - 1) {
            // If slide passes half of item width
            if (event.translationX * -1 > itemWidth / 2) {
                sharedActiveIndex.value += 1;
            }
        }
        else if (event.translationX > 0 && sharedActiveIndex.value > 0) {
            // If slide passes half of item width
            if (event.translationX > itemWidth / 2) {
                sharedActiveIndex.value -= 1;
            }
        }
        const tempNewOffset = calculateNewOffset(sharedActiveIndex.value);
        setActiveIndex(sharedActiveIndex.value); //We need this just to rerender component and pass updated value to child component
        offset.value = withTiming(tempNewOffset);
    });
    const wrapperAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
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
            ] }, props.children.map((children, index) => (React.createElement(CarousalItem, { itemWidth: itemWidth, index: index, activeIndex: activeIndex, itemStyle: props.itemStyle }, children))))));
}
