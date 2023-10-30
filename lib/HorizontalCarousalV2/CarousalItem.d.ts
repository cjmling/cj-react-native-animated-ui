import React from "react";
import { ViewStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";
interface Props {
    children: React.ReactNode;
    index: number;
    translateX: SharedValue<number>;
    offsetWidth: number;
    itemStyle?: ViewStyle;
}
declare const CarousalItem: (props: Props) => React.JSX.Element;
export default CarousalItem;
