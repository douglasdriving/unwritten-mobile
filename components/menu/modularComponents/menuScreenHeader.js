import { Text } from "react-native";
import { GetLoggedUserName } from "../../../backend/backendCalls";

export const MenuScreenHeader = (props) => {
  return (
    <Text>Logged in as {props.user.name}</Text>
  )
};