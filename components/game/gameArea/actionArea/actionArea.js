import { View } from "react-native";
import { useState } from "react";
import { YourTurnField } from "./yourTurnField/yourTurnField";
import { WritingField } from "./writingField/writingField";
import { WaitingField } from "./waitingField/waitingField";
import { PlayerSearchField } from "./playerSearchField/playerSearchField";


export const ActionArea = (props) => {
  
  const [isWriting, setIsWriting] = useState(null);

  const SetWritingField = type => {
    setIsWriting(type);
  }

  return (
    <View>

      {
        props.nextPlayerName == null ?
          <PlayerSearchField />
          :
          (
            props.nextPlayerName == props.user.name ?
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