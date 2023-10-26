import React, { Children, useState } from "react";
import { ViewStyle } from "react-native";
import "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import CarousalItem from "./CarousalItem";

interface Props {
  children: React.ReactNode[];
  wrapperStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  itemWidth?: number;
  itemGap?: number;
  itemInactiveOpacity?: number;
  itemActiveScale?: number;
}

export default function HorizontalCarousal(props: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const itemWidth = props.itemWidth || 50;
  const itemGap = props.itemGap || 10;
  const itemCount = Children.count(props.children);
  const itemInactiveOpacity = props.itemInactiveOpacity || 0.5;
  const itemActiveScale = props.itemActiveScale || 1.2;

  const offset = useSharedValue(0);
  const sharedActiveIndex = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {})
    .onChange((event) => {
      offset.value += event.changeX;
    })
    .onFinalize((event) => {
      // If slide to the left = negative value
      if (event.translationX < 0 && sharedActiveIndex.value < itemCount - 1) {
        // If slide passes half of item width
        if (event.translationX * -1 > itemWidth / 2) {
          sharedActiveIndex.value += 1;
        }
      } else if (event.translationX > 0 && sharedActiveIndex.value > 0) {
        // If slide passes half of item width
        if (event.translationX > itemWidth / 2) {
          sharedActiveIndex.value -= 1;
        }
      }
      const tempNewOffset = -sharedActiveIndex.value * (itemWidth + itemGap);
      runOnJS(setActiveIndex)(sharedActiveIndex.value); //We need this just to rerender component and pass updated value to child component https://github.com/software-mansion/react-native-gesture-handler/discussions/2061
      offset.value = withTiming(tempNewOffset);
    });

  const wrapperAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value,
      },
    ],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              gap: itemGap,
              justifyContent: "flex-start",
              width: (itemWidth + itemGap) * itemCount, // We need to set this otherwise its not scrollable on web
            },
            props.wrapperStyle,
            wrapperAnimatedStyle,
          ]}
        >
          {props.children.map((children, index) => (
            <CarousalItem
              key={index}
              itemWidth={itemWidth}
              index={index}
              activeIndex={activeIndex}
              itemStyle={props.itemStyle}
              itemInactiveOpacity={itemInactiveOpacity}
              itemActiveScale={itemActiveScale}
            >
              {children}
            </CarousalItem>
          ))}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
