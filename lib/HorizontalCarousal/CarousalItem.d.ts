import React from "react";
import { ViewStyle } from "react-native";
interface CarousalItemProps {
    itemStyle?: ViewStyle;
    index: number;
    activeIndex: number;
    children: React.ReactNode;
    itemWidth: number;
    itemInactiveOpacity: number;
    itemActiveScale: number;
}
declare const CarousalItem: (props: CarousalItemProps) => React.JSX.Element;
export default CarousalItem;
