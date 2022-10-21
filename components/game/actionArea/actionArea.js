import { useLinkProps } from "@react-navigation/native";
import { View, Text } from "react-native";
import { useState } from "react";

import { YourTurnField } from "./yourTurnField/yourTurnField";
import { WritingField } from "./writingField/writingField";
import { WaitingField } from "./waitingField/waitingField";
import { PlayerSearchField } from "./playerSearchField/playerSearchField";

import { loggedUser } from "../../../backendCalls/backendCalls";

export const ActionArea = (props) => {
  
  const [isWriting, setIsWriting] = useState(null);

  //when writing in the field, input new char count to props.updateCharsRemaining
  //should be several different things that can render here depending on the state of the game
  //1.

  /*
  will get a NAME passed down as props.nextPlayerName
  add writing field when a button is pressed
  */

  const SetWritingField = type => {
    setIsWriting(type);
  }

  return (
    <View>

      {/* <YourTurnField
        charsRemaining={props.charsRemaining}
        timeLeftInTurn={props.timeLeftInTurn}
        SetWritingField={SetWritingField}
        turnsUntilCanEnd={props.turnsUntilCanEnd}
        turnsUntilMustEnd={props.turnsUntilMustEnd}
      /> */}

      {
        props.nextPlayerName == null ?
          <PlayerSearchField />
          :
          (
            props.nextPlayerName == loggedUser.name ?
              (
                isWriting ?
                  <WritingField
                    charsRemaining={props.charsRemaining}
                    updateCharsRemaining={props.updateCharsRemaining}
                    AddScenario={props.AddScenario}
                    isWriting={isWriting}
                  />
                  :
                  <YourTurnField
                    charsRemaining={props.charsRemaining}
                    timeLeftInTurn={props.timeLeftInTurn}
                    SetWritingField={SetWritingField}
                    turnsUntilCanEnd={props.turnsUntilCanEnd}
                    
                  />
              )
              :
              <WaitingField nextPlayerName={props.nextPlayerName} timeLeftInTurn={props.timeLeftInTurn} />
          )
      }

    </View>
  );
}