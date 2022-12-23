import { View } from "react-native";
import { useState } from "react";
import { YourTurnField } from "./yourTurnField/yourTurnField";
import { WritingField } from "./writingField/writingField";
import { WaitingField } from "./waitingField/waitingField";
import { PlayerSearchField } from "./playerSearchField/playerSearchField";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../../redux/userSlice";
import { useEffect } from "react";

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

  // useEffect(() => {
  //   console.log('username passed down into action area: ', userName);
  //   console.log('next player name passed down into action area: ', props.nextPlayerName);
  //   console.log('if these are the same, writing area should be shown! otherwise it shouldnt');
  // }, [])

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