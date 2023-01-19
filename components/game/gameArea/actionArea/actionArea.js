import { View } from "react-native";
import { useState } from "react";
import { YourTurnField } from "./yourTurnField/yourTurnField";
import { WritingField } from "./writingField/writingField";
import { WaitingField } from "./waitingField/waitingField";
import { PlayerSearchField } from "./playerSearchField/playerSearchField";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../../redux/userSlice";

export const ActionArea = (props) => {

  const [isWriting, setIsWriting] = useState(null);
  const userName = useSelector(selectUserName);

  const SetWritingField = type => {
    setIsWriting(type);
  }

  const IsPlayersTurn = () => {

    if (!props.nextPlayerName) return false;
    if (!userName) return false;
    return (props.nextPlayerName == userName);

  }

  return (
    <View>

      {
        props.nextPlayerName == null ?
          <PlayerSearchField playerCount={props.players.length} />
          :
          (
            IsPlayersTurn() ?
              (
                isWriting ?
                  <WritingField
                    {...props}
                    isWriting={isWriting}
                    SetWritingField={SetWritingField}
                  />
                  :
                  <YourTurnField
                    {...props}
                    SetWritingField={SetWritingField}
                  />
              )
              :
              <WaitingField {...props} />
          )
      }

    </View>
  );
}