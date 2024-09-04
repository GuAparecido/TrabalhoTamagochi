import { StyleSheet, View} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tamagotchi, useTamagotchiDatabase } from "@/database/useTamagotchiDatabase";
import { useGlobalSearchParams } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

type bar = {
  position: number;
  isVisible: boolean;
}

  const BarHunger = (response: Tamagotchi) => {
    const [barHunger, setBarHunger] = useState<bar[]>([]);

  function populateBar(response: Tamagotchi) {
    const hunger: bar[] = [];

    if (response) {
        for (let i = 1; i <= 10; i++) {
            hunger.push({ position: i, isVisible: i <= (response.counterHunger/10)});
        }
        setBarHunger(hunger);
    }
}


  function getBarStyle (fun: bar) {
    if (fun.isVisible) {
      if (fun.position === 1) {
        return styles.barLeft;
      } else if (fun.position === 10) {
        return styles.barRight;
      } else {
        return styles.bar;
      }
    } else {
      if (fun.position === 1) {
        return styles.barLeftNone;
      } else if (fun.position === 10) {
        return styles.barRightNone;
      } else {
        return styles.barNone;
      }
    }
  }

  return (
      <View style={styles.row}>
        <View style={styles.icons}>
        <FontAwesome6
            name="burger"
            size={40}
            color="white"
            backgroundColor="#7D3106"
          />
        </View>
      <View style={styles.row}>
        <View style={styles.loadingContainer}>
        {barHunger.map((hunger) => (
            <View
              key={hunger.position}
              style={getBarStyle(hunger)}
            />
          ))}
        </View>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    backgroundColor: "#7D3106",
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  bar: {
    marginLeft: 2,
    width: 26,
    height: 30,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
  },
  barLeft: {
    marginLeft: 2,
    width: 26,
    height: 30,
    borderRadius: 2,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  barRight: {
    marginLeft: 2,
    width: 26,
    height: 30,
    borderRadius: 2,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  barNone: {
    width: 26,
    height: 32,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
    display: "none"
  },
  barLeftNone: {
    width: 26,
    height: 32,
    borderRadius: 2,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    display: "none",
  },
  barRightNone: {
    width: 26,
    height: 32,
    borderRadius: 2,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    display: "none",
  },
  loadingContainer: {
    width: 290,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBAC5C",
    padding: 2,
    borderRadius: 20,
    borderColor: "#7D3106",
    borderWidth: 2,
  },
});

export default BarHunger;