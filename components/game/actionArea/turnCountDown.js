import { Text } from "react-native";
import { useState, useEffect } from "react";
import { TimeToHms } from "../../../helperFunctions/helpers";

export const TurnCountDown = (props) => {

  return (
    <Text>{TimeToHms(props.timeLeftInTurn)}</Text>
  );
}