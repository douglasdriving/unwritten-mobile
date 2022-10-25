import { Text } from "react-native";
import { GetLoggedUserName } from "../../../backend/backendCalls";

export const MenuScreenHeader = () => {
  return (
    <Text>Logged in as {GetLoggedUserName()}</Text>
  )
};