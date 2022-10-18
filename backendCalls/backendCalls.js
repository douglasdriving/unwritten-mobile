import { GenerateRandomString, PickRandomFromArray, GetRandomInt } from "../helperFunctions/helpers"
import { fakeWriters, fakeTitles, scenarioTextPlaceholder } from "./fakeData";

console.log('backend started ' + new Date());

//balancing
const maxScenarioCount = 40;

//GENERATE DATA
const GenerateRandomRoom = (turnsTaken, authorCount) => {

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

  //CREATE ROOM OBJECT
  const room = {
    title: PickRandomFromArray(fakeTitles),
    description: 'An epic tale of an epic adventure',
    creator: creator,
    authors: authors,
    turnsTaken: turnsTaken,
    nextPlayer: nextPlayer,
    id: GenerateRandomString(),
    scenarios: scenarios
  };

  return room;
}
const GenerateRandomRoomArray = (newRoomsCount, ongoingRoomsCount, finishedRoomsCount, leavedRoomsCount) => {

  const rooms = [];

  for (let i = 0; i < ongoingRoomsCount; i++) {
    rooms.push(GenerateRandomRoom(GetRandomInt(4, maxScenarioCount - 3), 3));
  }

  for (let i = 0; i < newRoomsCount; i++) {
    const authorCountInNewRoom = GetRandomInt(1, 3);
    rooms.push(GenerateRandomRoom(authorCountInNewRoom+1, authorCountInNewRoom));
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
const rooms = GenerateRandomRoomArray(10, 20, 6, 3);

//USER
let loggedUser;
let storyKeys = 4;

export const GetLoggedUserName = () => {
  return loggedUser.name;
}

export const GetUser = async () => {

  user = {
    name: PickRandomFromArray(fakeWriters),
    premium: true,
    new: false
  };

  loggedUser = user;

  return user;

}

export const CreateNewUser = async () => {

  user = {
    name: PickRandomFromArray(fakeWriters),
    premium: false,
    new: true
  };

  loggedUser = user;

  return user;

}

//STORIES
export const GetAvailableRooms = async () => {

  const availableRooms = rooms.filter(room => (
    room.creator != loggedUser.name
    && !room.authors.includes(loggedUser.name)
    && room.authors.length < 3
  ));

  const newRooms = availableRooms.filter(room => (
    room.scenarios.length < 4
  ))
  const roomWithLeavers = availableRooms.filter(room => (
    room.scenarios.length >= 4
  ))

  return {new: newRooms, ongoing: roomWithLeavers};
}

export const GetMyRooms = async () => {

  const myRooms = rooms.filter(room => (
    room.creator == loggedUser.name
    ||
    room.authors.includes(loggedUser.name)
  ));

  const openRooms = myRooms.filter(room => (
    (room.scenarios.length < maxScenarioCount)
  ));
  const closedRooms = myRooms.filter(room => (
    (room.scenarios.length == maxScenarioCount)
  ));

  return { open: openRooms, closed: closedRooms };
}

export const GetFinishedStories = async () => {
  const finishedStories = rooms.filter(room => (room.scenarios.length == maxScenarioCount));
  return finishedStories;
}

export const GetStoryKeys = async () => {
  return storyKeys;
}

export const CreateNewRoom = async (title, description, opening) => {

  const room = {
    title: title,
    description: description,
    creator: loggedUser.name,
    authors: [],
    turnsTaken: 1,
    nextPlayer: null,
    id: GenerateRandomString(),
    scenarios: [{
      author: loggedUser.name,
      text: opening
    }]
  };

  rooms.push(room);
  return room.id;
}

//Old STUFF
// const exampleStoryFull = {
//   title: 'storyTitle',
//   description: 'storyDesc',
//   creator: 'creatorUsername',
//   authors: ['author1', 'author2', 'author3'],
//   turn: 34,
//   playersTurn: true,
//   id: GenerateRandomString(),
// }

// const GenerateRandomRoom = (authorCount, loggedPlayerIsIn, scenarioCount, closed,) => {
//   //generate and return a room with some random text etc based on the passed info
// }

