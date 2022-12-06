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

  return (
    <View>

      {/* <YourTurnField
        {...props}
        SetWritingField={SetWritingField}
      /> */}
      
      
      {
        props.nextPlayerName == null ?
          <PlayerSearchField />
          :
          (
            props.nextPlayerName == userName ?
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