import { View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Bar = {
  position: number;
  isVisible: boolean;
};

type Props = {
  counterFun: number;
  icon: "happy" | "pizza" | "moon";
  styles: {
    row: ViewStyle;
    icons?: ViewStyle;
    bar?: ViewStyle;
    barLeft?: ViewStyle;
    barRight?: ViewStyle;
    barNone?: ViewStyle;
    barLeftNone?: ViewStyle;
    barRightNone?: ViewStyle;
    loadingContainer?: ViewStyle;
  };
  size: number;
};

const Bars = ({ counterFun, icon, size, styles }: Props) => {
  const [barFun, setBarFun] = useState<Bar[]>([]);

  function populateBar(counterFun: number) {
    const fun: Bar[] = [];
    for (let i = 1; i <= 10; i++) {
      fun.push({ position: i, isVisible: i <= counterFun / 10 });
    }
    setBarFun(fun);
  }

  function getBarStyle(bar: Bar) {
    if (bar.isVisible) {
      if (bar.position === 1) {
        return styles.barLeft;
      } else if (bar.position === 10) {
        return styles.barRight;
      } else {
        return styles.bar;
      }
    } else {
      if (bar.position === 1) {
        return styles.barLeftNone;
      } else if (bar.position === 10) {
        return styles.barRightNone;
      } else {
        return styles.barNone;
      }
    }
  }

  useEffect(() => {
    populateBar(counterFun);
  }, [counterFun]);

  return (
    <View style={styles.row}>
      <View style={styles.icons}>
        <Ionicons name={icon} size={size} color="white" />
      </View>
      <View style={styles.loadingContainer}>
        {barFun.map((bar) => (
          <View key={bar.position} style={getBarStyle(bar)} />
        ))}
      </View>
    </View>
  );
};

export default Bars;
