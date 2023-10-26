import React from "react";
import { ViewStyle } from "react-native";
import "react-native-gesture-handler";
interface Props {
    children: React.ReactNode[];
    wrapperStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    itemWidth?: number;
    itemGap?: number;
    itemInactiveOpacity?: number;
    itemActiveScale?: number;
}
export default function HorizontalCarousal(props: Props): React.JSX.Element;
export {};
