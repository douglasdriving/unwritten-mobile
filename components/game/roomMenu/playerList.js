import { View, Text } from "react-native";
import { TurnCountDown } from "../actionArea/turnCountDown";
import { PlayerRow } from "./playerRow";

export const PlayerList = (props) => {

  return (
    <View>

      {props.players && <PlayerRow
        player={props.players.creator}
        isNextPlayer={props.nextPlayer == 0}
        timeLeftInTurn={props.timeLeftInTurn}
      />}

      {props.players.authors && props.players.authors.map((player, i) => (
        <PlayerRow
          player={player}
          isNextPlayer={i == props.nextPlayer + 1}
          key={player.id}
          timeLeftInTurn={props.timeLeftInTurn}
        />
      ))}

      {/* <PlayerRow
        player={{name:'testy'}}
        isNextPlayer={true}
        key={'oidawjd80w98'}
        timeLeftInTurn={props.timeLeftInTurn}
      /> */}

    </View>
  );
}