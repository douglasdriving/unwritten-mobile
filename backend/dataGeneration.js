import { GenerateRandomString, PickRandomFromArray, GetRandomInt } from "../helpers/helpers"
import { fakeWriters, fakeTitles, scenarioTextPlaceholder } from "./fakeData";
import { TwoDaysFromNowInMs } from "../helpers/dateTimeFunctions";

//BALANCING VARIABLES
export const maxScenarioCount = 40;
export const turnWhenCanEnd = 30;

//DATA GENERATION METHODS
export const GenerateRandomRoom = (scenarioCount, authorCount) => {

  if (scenarioCount > 40) scenarioCount = 40;

  //CORRECT FOR NEW ROOMS
  if (scenarioCount < 5) {
    authorCount = scenarioCount - 1;
  }

  //ADD A CREATOR
  const creator = GenerateRandomPlayer();

  //ADD AUTHORS
  let authors = [];
  for (let i = 0; i < authorCount; i++) {
    authors.push(GenerateRandomPlayer());
  }

  //FIND OUT WHO IS THE NEXT PLAYER
  let nextPlayer = scenarioCount % 4;

  //ADD 500 CHARS TO THE NEXT PLAYER
  if (nextPlayer == 0) creator.charsRemaining += 500;
  else if (authorCount >= nextPlayer) authors[nextPlayer - 1].charsRemaining += 500;

  //ADD SCENARIOS
  const allPlayers = [creator, ...authors];
  if (scenarioCount > 4) {
    while (allPlayers.length < 4) {
      allPlayers.splice(1, 0, GenerateRandomPlayer()); //insert player at i=1
    }
  }
  const scenarios = [];
  for (let i = 0; i < scenarioCount; i++) {
    scenarios.push({
      text: scenarioTextPlaceholder,
      author: allPlayers[i % 4],
      id: GenerateRandomString()
    })
  };

  //Gen ID
  const roomId = GenerateRandomString();

  //is the story finished?
  let finished = false;
  if (scenarios.length >= maxScenarioCount) finished = true;
  else finished = ((scenarios.length >= turnWhenCanEnd) && (GetRandomInt(1, 10) > 5));

  //CREATE ROOM OBJECT
  const room = {
    title: PickRandomFromArray(fakeTitles),
    description: 'An epic tale of an epic adventure',
    creator: creator,
    authors: authors,
    nextPlayer: nextPlayer, //int specifies number in list
    id: roomId,
    scenarios: scenarios,
    deadline: TwoDaysFromNowInMs(),
    finished: finished,
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
    charsRemaining: GetRandomInt(1, 499)
  }
}