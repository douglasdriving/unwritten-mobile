import { View } from "react-native";
import { useState } from "react";
import { YourTurnField } from "./yourTurnField/yourTurnField";
import { WritingField } from "./writingField/writingField";
import { WaitingField } from "./waitingField/waitingField";
import { PlayerSearchField } from "./playerSearchField/playerSearchField";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../../redux/userSlice";
import { selectNextPlayer } from "../../../../redux/roomSlice";

export const ActionArea = () => {

  const [isWriting, setIsWriting] = useState(null);
  const userName = useSelector(selectUserName);
  const nextPlayer = useSelector(selectNextPlayer);

  const SetWritingField = type => {
    setIsWriting(type);
  }

  const IsPlayersTurn = () => {

    if (nextPlayer == null) return false;
    if (!userName) return false;
    return (nextPlayer.name == userName);

  }

  return (
    <View>

      <PlayerSearchField />

      {/* {
        nextPlayer == null ?
          <PlayerSearchField />
          :
          (
            IsPlayersTurn() ?
              (
                isWriting ?
                  <WritingField
                    isWriting={isWriting}
                    SetWritingField={SetWritingField}
                  />
                  :
                  <YourTurnField
                    SetWritingField={SetWritingField}
                  />
              )
              :
              <WaitingField />
          )
      } */}

    </View>
  );
}