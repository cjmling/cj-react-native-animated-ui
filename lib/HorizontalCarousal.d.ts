import React from "react";
import { ViewStyle } from "react-native";
interface Props {
    children: React.ReactNode[];
    wrapperStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    itemWidth?: number;
    itemGap?: number;
}
export default function HorizontalCarousal(props: Props): React.JSX.Element;
export {};
