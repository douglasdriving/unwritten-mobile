import { GenerateRandomString, PickRandomFromArray, GetRandomInt } from "../helperFunctions/helpers"
import { fakeWriters, fakeTitles, scenarioTextPlaceholder } from "./fakeData";

//BALANCING VARIABLES
export const maxScenarioCount = 40;

//DATA GENERATION METHODS
export const GenerateRandomRoom = (turnsTaken, authorCount) => {

  //ADD A CREATOR
  const creator = PickRandomFromArray(fakeWriters);

  //ADD AUTHORS
  let authors = [];
  for (let i = 0; i < authorCount; i++) {
    authors.push(PickRandomFromArray(fakeWriters));
  }
  const currentPlayers = authors.concat(creator);

  //FIND OUT WHO IS THE NEXT PLAYER
  const turnsTakenInRound = turnsTaken % 4;
  let nextPlayer;
  if (turnsTakenInRound == 0) nextPlayer = creator;
  else if (turnsTaken < 4 || turnsTaken == maxScenarioCount) nextPlayer = null;
  else nextPlayer = authors[Math.min((turnsTakenInRound - 1), (authorCount - 1))];

  //ADD SCENARIOS
  const scenarios = [];
  const allPlayers = currentPlayers;
  while (allPlayers.length < 4) {
    allPlayers.splice(1, 0, PickRandomFromArray(fakeWriters)); //insert player at i=1
  }
  for (let i = 0; i < turnsTaken; i++) {
    scenarios.push({
      text: scenarioTextPlaceholder,
      author: allPlayers[i % 4 - 1]
    })
  };

  //Gen ID
  const roomId = GenerateRandomString();
  //console.log()

  //CREATE ROOM OBJECT
  const room = {
    title: PickRandomFromArray(fakeTitles),
    description: 'An epic tale of an epic adventure',
    creator: creator,
    authors: authors,
    turnsTaken: turnsTaken,
    nextPlayer: nextPlayer,
    id: roomId,
    scenarios: scenarios
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