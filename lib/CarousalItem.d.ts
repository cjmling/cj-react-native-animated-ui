import React from "react";
import { StyleProp, ViewStyle } from "react-native";
interface CarousalItemProps {
    style?: StyleProp<ViewStyle>;
    index: number;
    activeIndex: number;
    children: React.ReactNode;
    itemWidth: number;
}
declare const CarousalItem: (props: CarousalItemProps) => React.JSX.Element;
export default CarousalItem;
