import { GenerateRandomString, PickRandomFromArray, GetRandomInt } from "../helperFunctions/helpers"
import { fakeWriters, fakeTitles } from "./fakeData";

console.log('backend started ' + new Date());

//balancing
const maxScenarioCount = 40;

//GENERATE DATA
const GenerateRandomRoom = (turnsTaken) => {

  const creator = PickRandomFromArray(fakeWriters);

  let authors = [];
  const authorCount = (turnsTaken < 4) ? turnsTaken : 4;
  for (let i = 0; i < authorCount; i++) {
    authors.push(PickRandomFromArray(fakeWriters));
  }

  //const turnsTaken = turnsTaken; //isNew ? authorCount : (Math.floor(Math.random() * 36) + 4);
  const turnsTakenInRound = turnsTaken % 4;
  let nextPlayer;
  if (turnsTakenInRound == 0) nextPlayer = creator;
  else if (turnsTaken < 4 || turnsTaken == maxScenarioCount) nextPlayer = null;
  else nextPlayer = authors[turnsTakenInRound - 1];

  const scenarios = [];
  for (let i = 0; i < turnsTaken; i++) {
    let author;
    if (i % 4 == 0) author = creator;
    else author = authors[i % 4 - 1];
    scenarios.push({
      text: 'The wild wolf fell into the example scenario text and was confused about what to do. The red fox jumped over the fence. Everyone expected some fat lorem ipsum but this is all they received',
      author: author
    })
  };

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
const GenerateRandomRoomArray = (newRoomsCount, ongoingRoomsCount, finishedRoomsCount) => {

  const rooms = [];

  for (let i = 0; i < ongoingRoomsCount; i++) {
    rooms.push(GenerateRandomRoom(GetRandomInt(4, maxScenarioCount - 1)));
  }

  for (let i = 0; i < newRoomsCount; i++) {
    rooms.push(GenerateRandomRoom(GetRandomInt(1, 3)));
  }

  for (let i = 0; i < finishedRoomsCount; i++) {
    rooms.push(GenerateRandomRoom(maxScenarioCount));
  }

  return rooms;

}
const rooms = GenerateRandomRoomArray(10, 20, 6);

//USER
let loggedUser;

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
    room.story.scenarios.length < 4
  ))
  //currently no rooms with more than 4 scenarios but less than 4 authors. have to add some
  const ongoingRooms = availableRooms.filter(room => (
    room.story.scenarios.length >= 4
  ))

  return rooms;
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
    (room.scenarios.length = maxScenarioCount)
  ));

  return {open: openRooms, closed: closedRooms};
}

export const GetFinishedStories = async () => {
  const finishedStories = rooms.filter(room => (room.scenarios.length == maxScenarioCount));
  return finishedStories;
}

export const GetStoryKeys = async () => {
  return 4;
}

export const CreateNewRoom = async (title, description, opening) => {
  //add a new story to the database and get back an ID for the story
  const newRoom = {
    story: {
      title: title,
      description: description,
      scenarios: [{
        author: loggedUser.name,
        text: opening
      }]
    },
    creator: loggedUser.name,
    authors: [],
    closed: false,
    id: GenerateRandomString(),
  }
  rooms.push(newRoom);
  return newRoom.id;
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

