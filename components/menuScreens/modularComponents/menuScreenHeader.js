//add stuff here that you want to always be at the top of your menu screens
import { Text } from "react-native";
import { GetLoggedUserName } from "../../../backendCalls/backendCalls";

export const MenuScreenHeader = () => {
  return (
    <Text>Logged in as {GetLoggedUserName()}</Text>
  )
};