import React, { Children } from "react";
import "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import CarousalItem from "./CarousalItem";
export default function HorizontalCarousalV2(props) {
    const itemWidth = props.itemWidth || 50;
    const itemGap = props.itemGap || 10;
    const itemCount = Children.count(props.children);
    const translateX = useSharedValue(0);
    const sharedActiveIndex = useSharedValue(0);
    const pan = Gesture.Pan()
        .onBegin(() => { })
        .onChange((event) => {
        translateX.value += event.changeX;
    })
        .onFinalize((event) => {
        // If slide to the left = negative value
        if (event.translationX < 0 && sharedActiveIndex.value < itemCount - 1) {
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
        const tempNewOffset = -sharedActiveIndex.value * (itemWidth + itemGap);
        translateX.value = withTiming(tempNewOffset);
    });
    const wrapperAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));
    return (React.createElement(GestureHandlerRootView, { style: { flex: 1 } },
        React.createElement(GestureDetector, { gesture: pan },
            React.createElement(Animated.View, { style: [
                    {
                        display: "flex",
                        flexDirection: "row",
                        gap: itemGap,
                        justifyContent: "flex-start",
                        width: (itemWidth + itemGap) * itemCount, // We need to set this otherwise its not scrollable on web
                    },
                    props.wrapperStyle,
                    wrapperAnimatedStyle,
                ] }, props.children.map((children, index) => (React.createElement(CarousalItem, { key: index, index: index, itemStyle: props.itemStyle, translateX: translateX, offsetWidth: itemWidth + itemGap }, children)))))));
}
