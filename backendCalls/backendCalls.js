import { GenerateRandomString, PickRandomFromArray, GetRandomInt, TwoDaysFromNowInMs } from "../helperFunctions/helpers"
import { fakeWriters, fakeTitles, scenarioTextPlaceholder } from "./fakeData";
import { GenerateRandomRoomArray, GenerateRandomRoom, maxScenarioCount } from './dataGeneration.js';
import { AsyncStorage } from 'react-native';

console.log('backend started ' + new Date());

//VARS
let rooms;
let storyKeys = 4;

//LOAD DATA FROM ASYNC FILE STORAGE
const LoadRoomData = async () => {

  const loadedRoomsData = await AsyncStorage.getItem('rooms');

  if (false) {
    console.log('loaded rooms data successfully!');
    rooms = JSON.parse(loadedRoomsData);
  }
  else {
    console.log('created new room data');
    rooms = GenerateRandomRoomArray(10, 20, 6, 3)
    await UpdateFileStorage()
  };
}

//USER
export const GetLoggedUserName = () => {
  return 'flopson'
}

export const GetUser = async () => {
  return {
    name: 'flopson',
    premium: true,
    new: false,
    id: 'jdwdj89weadj89ewadj'
  };
}

//ROOMS
const UserIsInRoom = (room, name) => {

  let isInRoom = false;

  if (room.creator.name == name) isInRoom = true;
  room.authors.forEach(author => {
    if (author.name == name) isInRoom = true;
  })

  return isInRoom

}

export const GetAvailableRooms = async () => {

  const availableRooms = rooms.filter(room => (
    !UserIsInRoom(room, GetLoggedUserName())
    && (room.authors.length < 3)
  ));

  const newRooms = availableRooms.filter(room => (
    room.scenarios.length < 4
  ))
  const roomWithLeavers = availableRooms.filter(room => (
    room.scenarios.length >= 4
  ))

  return { new: newRooms, ongoing: roomWithLeavers };
}

export const GetMyRooms = async () => {

  const myRooms = rooms.filter(room => (
    UserIsInRoom(room, GetLoggedUserName())
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

export const CreateRoom = async (title, description, opening) => {

  console.log('creating a new room');

  const creator = await GetUser();

  const room = {
    title: title,
    description: description,
    creator: creator,
    authors: [],
    turnsTaken: 1,
    nextPlayer: null,
    id: GenerateRandomString(),
    scenarios: [{
      author: creator,
      text: opening,
      id: GenerateRandomString()
    }],
    deadline: TwoDaysFromNowInMs()
  };

  rooms.push(room);
  await UpdateFileStorage()
  return room.id;
}

export const GetRoomData = async roomId => {
  let roomToReturn = null;
  rooms.forEach((room, i) => {
    if (room.id == roomId) {
      roomToReturn = room;
    }
  })
  return roomToReturn;
}

export const LogAllRooms = async () => {

  console.log('ALL ROOMS:')
  rooms.forEach((room, i) => {
    console.log(room.title, " ", room.id);
  })

}

export const JoinRoom = async (roomId) => {

  const user = await GetUser();
  let success = false;

  rooms.forEach(room => {
    if (room.id != roomId) return;
    if (room.authors.length >= 3) return;
    if (UserIsInRoom(room, user.name)) return;
    room.authors.push({
      name: user.name,
      id: user.id,
      strikes: 0,
      strikeNotification: false,
      charsRemaining: 500
    });
    room.nextPlayer = room.authors.length;
    room.deadline = TwoDaysFromNowInMs();
    success = true;
  });

  if (success) await UpdateFileStorage();
  return success;
}

//SCENARIOS
export const UploadScenario = async (text, roomId) => {

  //MAKE A SHITLOAD OF CHECKS TO MAKE SURE THIS UPLOAD IS LEGIT

  //SETUP THE ROOM
  room = await GetRoomData(roomId);
  const user = await GetUser();
  room.scenarios.push({
    text: text,
    author: user,
    id: GenerateRandomString()
  })
  room.turnsTaken++;
  room.nextPlayer++;
  room.nextPlayer > room.authors.length && (room.nextPlayer = 0);
  room.deadline = TwoDaysFromNowInMs(); //turn into helper function ?

  //UPLOAD THE FULL ROOMS OBJECT TO THE DB
  await UpdateFileStorage();

  return true;

}

async function UpdateFileStorage() {
  await AsyncStorage.setItem('rooms', JSON.stringify(rooms));
}

//RUN ON START
LoadRoomData();


