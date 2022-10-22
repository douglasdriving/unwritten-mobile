import { GenerateRandomString, PickRandomFromArray, GetRandomInt } from "../helperFunctions/helpers"
import { fakeWriters, fakeTitles, scenarioTextPlaceholder } from "./fakeData";

//BALANCING VARIABLES
export const maxScenarioCount = 40;
export const turnWhenCanEnd = 30;

//DATA GENERATION METHODS
export const GenerateRandomRoom = (turnsTaken, authorCount) => {

  //ADD A CREATOR
  const creator = GenerateRandomPlayer();

  //ADD AUTHORS
  let authors = [];
  for (let i = 0; i < authorCount; i++) {
    authors.push(GenerateRandomPlayer());
  }

  //FIND OUT WHO IS THE NEXT PLAYER
  let nextPlayer = turnsTaken % 4;

  //ADD 500 CHARS TO THE NEXT PLAYER
  if (nextPlayer == 0) creator.charsRemaining += 500;
  else if(authorCount >= nextPlayer) authors[nextPlayer-1].charsRemaining += 500;

  //ADD SCENARIOS
  const allPlayers = [creator, ...authors];
  while (allPlayers.length < 4) {
    allPlayers.splice(1, 0, GenerateRandomPlayer()); //insert player at i=1
  }
  const scenarios = [];
  for (let i = 0; i < turnsTaken; i++) {
    scenarios.push({
      text: scenarioTextPlaceholder,
      author: allPlayers[i%4],
      id: GenerateRandomString()
    })
  };

  //Gen ID
  const roomId = GenerateRandomString();

  //CREATE ROOM OBJECT
  const room = {
    title: PickRandomFromArray(fakeTitles),
    description: 'An epic tale of an epic adventure',
    creator: creator,
    authors: authors,
    turnsTaken: turnsTaken,
    nextPlayer: nextPlayer, //int specifies number in list
    id: roomId,
    scenarios: scenarios,
    deadline: (new Date().getTime() + 172800000) //2 days from now
  };

  return room;
}
export const GenerateRandomRoomArray = (newRoomsCount, ongoingRoomsCount, finishedRoomsCount, leavedRoomsCount) => {

  const rooms = [];

  for (let i = 0; i < ongoingRoomsCount; i++) {
    rooms.push(GenerateRandomRoom(GetRandomInt(4, maxScenarioCount - 3), 3));
  }

  for (let i = 0; i < newRoomsCount; i++) {
    const authorCountInNewRoom = GetRandomInt(1, 3);
    rooms.push(GenerateRandomRoom(authorCountInNewRoom + 1, authorCountInNewRoom));
  }

  for (let i = 0; i < finishedRoomsCount; i++) {
    rooms.push(GenerateRandomRoom(maxScenarioCount, 3));
  }

  for (let i = 0; i < leavedRoomsCount; i++) {
    rooms.push(GenerateRandomRoom(
      GetRandomInt(5, maxScenarioCount - 3),
      GetRandomInt(1, 2)
    ));
  }

  return rooms;
}

export const GenerateRandomPlayer = () => {

  const strikes = GetRandomInt(0, 2);
  const strikeNotification = (
    strikes != 0
    &&
    Math.random() > 0.5 //if there are strikes, there is a 50% chance that the player has not yet seen them
  );

  return {
    name: PickRandomFromArray(fakeWriters),
    id: GenerateRandomString(),
    strikes: strikes,
    strikeNotification: strikeNotification,
    charsRemaining: GetRandomInt(1,499)
  }
}